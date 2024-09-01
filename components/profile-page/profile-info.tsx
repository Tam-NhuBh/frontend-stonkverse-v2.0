import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import LoggedinUserAvatar from "../loggedin-user-avatar";
import { AiOutlineCamera } from "react-icons/ai";
import FormInput from "../form-input";
import useUserInfo from "@/hooks/useUserInfo";
import BtnWithLoading from "../btn-with-loading";
import toast from "react-hot-toast";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/store/user/user-api";
import { useLoadUserQuery } from "@/store/api-slice";
import { ImSpinner } from "react-icons/im";

interface Props {}

const ProfileInfo: FC<Props> = (props): JSX.Element => {
  const user = useUserInfo();
  const [name, setName] = useState(user.name);

  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const [updateAvatar, { isSuccess, error, isLoading }] =
    useUpdateAvatarMutation();

  const avatarChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
          updateAvatar(avatar);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const [
    editProfile,
    { isSuccess: editSuccess, error: editError, isLoading: isEditing },
  ] = useEditProfileMutation();

  const editSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length) {
      await editProfile({ name });
    }
  };

  useEffect(() => {
    if (isSuccess || editSuccess) {
      setLoadUser(true);
      toast.success("Updated user info successfully!");
    }

    if (error || editError) {
      const errorData = (error as any) || (editError as any);
      toast.error(errorData?.data.message);
    }
  }, [isSuccess, editSuccess, error, editError]);

  return (
    <div className="block-wrapper py-8">
      <div className="w-2/3 max-[600px]:w-[90%] mx-auto">
        <div className="w-32 h-32 relative rounded-full border-[3px] mx-auto mb-4">
          {isLoading ? (
            <div className="h-full rounded-full bg-slate-500 text-dark_text grid place-items-center">
              <ImSpinner className="animate-spin" size={30} />
            </div>
          ) : (
            <LoggedinUserAvatar customClasses="rounded-full" />
          )}
          <input
            type="file"
            name="avatar"
            id="avatar"
            hidden
            accept="image/png, image/jpg, image/jpeg, image/webp"
            onChange={avatarChangeHandler}
          />
          <label
            htmlFor="avatar"
            className="absolute w-8 h-8 bg-slate-500 dark:bg-tertiary text-dark_text rounded-full bottom-2 right-0 grid place-items-center border cursor-pointer hover:scale-105 transition"
          >
            <AiOutlineCamera className="z-1" size={20} />
          </label>
        </div>

        <form className="pb-4" onSubmit={editSubmitHandler}>
          <FormInput
            label="Name"
            id="Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          <FormInput
            label="Email"
            id="Email"
            disabled
            value={user.email}
            readOnly
          />

          <BtnWithLoading
            type="submit"
            content="Update"
            isLoading={isEditing}
            customClasses="!bg-slate-600 dark:!bg-secondary mt-5"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
