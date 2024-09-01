import { Dispatch, FC, SetStateAction } from "react";
import { profileItemsData } from "@/data/profile-items";
import { signOut } from "next-auth/react";
import LoggedinUserAvatar from "../loggedin-user-avatar";
import useIsAdmin from "@/hooks/useIsAdmin";
import Link from "next/link";
import { useLogoutMutation } from "@/store/auth/auth-api";
import { useRouter } from "next/navigation";

interface Props {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

const common =
  "flex items-center py-4 pl-4 max-[960px]:pl-[18px] max-[600px]:pl-4 cursor-pointer gap-2 text-[20px] max-[600px]:text-base";

const ProfileSidebar: FC<Props> = ({ active, setActive }): JSX.Element => {
  const isAdmin = useIsAdmin();
  const router = useRouter();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    await signOut({ redirect: false });
    await logout({});
    router.push("/");
  };

  return (
    <div className="w-[310px] max-[960px]:w-[60px] max-[600px]:w-[50px] block-wrapper h-fit pb-2 overflow-hidden">
      <div
        className={`w-full py-4 flex items-center gap-x-2 px-3 rounded-t-[5px] cursor-pointer ${
          active === 1 ? "main-gradient text-dark_text" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <div className="w-8 aspect-square relative rounded-full overflow-hidden border">
          <LoggedinUserAvatar />
        </div>

        <h1 className="max-[960px]:hidden">My Account</h1>
      </div>

      {profileItemsData.map((item, index) => {
        if (item.title === "Admin Dashboard" && !isAdmin) {
          return null;
        }

        const adjustedIndex = item.title === "Admin Dashboard" ? 5 : index + 2;

        return item.title === "Admin Dashboard" ? (
          <Link
            href="/admin"
            className={`${common} ${
              active === adjustedIndex ? "main-gradient text-dark_text" : "bg-transparent"
            }`}
            key={index}
            onClick={() => {
              setActive(adjustedIndex);
            }}
          >
            {item.icon({})}
            <span className="max-[960px]:hidden text-base">{item.title}</span>
          </Link>
        ) : (
          <div
            className={`${common} ${
              active === adjustedIndex ? "main-gradient text-dark_text" : "bg-transparent"
            }`}
            key={index}
            onClick={() => {
              !item.isLogout ? setActive(adjustedIndex) : logoutHandler();
            }}
          >
            {item.icon({})}
            <span className="max-[960px]:hidden text-base">{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
