"use client";

import { Dispatch, FC, SetStateAction } from "react";
import NavItems from "./nav-items";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import Link from "next/link";
import NextImage from "../next-image";
import LoggedinUserAvatar from "../loggedin-user-avatar";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openLoginModal: () => void;
}

const MobileSidebar: FC<Props> = ({
  open,
  setOpen,
  openLoginModal,
}): JSX.Element => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div
      className={`fixed h-screen top-0 left-0 w-full z-50 dark:bg-[unset] bg-[#00000024] transition duration-500 ${
        open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      onClick={() => setOpen(false)}
    >
      <div className="w-[70%] fixed z-50 h-screen bg-white dark:bg-slate-900 top-0 right-0 pb-5 text-center flex flex-col justify-between">
        <div className="flex flex-col justify-center flex-1">
          <NavItems isMobile />

          {user ? (
            <Link
              href="/profile"
              className="w-5 h-5 relative rounded-full overflow-hidden mx-auto mt-4 cursor-pointer border border-zinc-500 dark:border-white"
            >
              <LoggedinUserAvatar />
            </Link>
          ) : (
            <HiOutlineUserCircle
              size={20}
              className="dark:text-dark_text text-slate-700 cursor-pointer mx-auto mt-4"
              onClick={openLoginModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
