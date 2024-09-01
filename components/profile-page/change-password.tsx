import { FC, useEffect } from "react";

import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdatePasswordMutation } from "@/store/user/user-api";

interface Props {}

const schema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Please enter you old password")
    .min(6, "Password must has at least 6 characters"),
  newPassword: Yup.string()
    .required("Please enter you new password")
    .min(6, "Password must has at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please enter you new password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .min(6, "Password must has at least 6 characters"),
});

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: FC<Props> = (props): JSX.Element => {
  const form = useForm<FormValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const [updatePassword, { isSuccess, error, isLoading }] =
    useUpdatePasswordMutation();

  const onSubmit = async (data: FormValues) => {
    await updatePassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated password successfully!");
      reset();
    }

    if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="block-wrapper py-8">
      <div className="w-2/3 max-[600px]:w-[90%] mx-auto">
        <h2 className="font-bold dark:text-dark_text text-tertiary text-2xl text-center">
          Change Password
        </h2>
        <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Old password"
            id="oldPassword"
            register={register("oldPassword")}
            errorMsg={errors.oldPassword?.message}
          />

          <FormInput
            label="New password"
            id="newPassword"
            register={register("newPassword")}
            errorMsg={errors.newPassword?.message}
          />

          <FormInput
            label="Confirm your new password"
            id="confirmPassword"
            register={register("confirmPassword")}
            errorMsg={errors.confirmPassword?.message}
          />

          <BtnWithLoading
            type="submit"
            content="Update"
            isLoading={isLoading}
            customClasses="!bg-slate-600 dark:!bg-secondary mt-5"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
