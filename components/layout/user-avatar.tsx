"use client";

import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import NextImage from "../next-image";
import { HiOutlineUserCircle } from "react-icons/hi";
import LoggedinUserAvatar from "../loggedin-user-avatar";

interface Props {
  openLoginModal: () => void;
}

const UserAvatar: FC<Props> = ({ openLoginModal }): JSX.Element => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      {user ? (
        <Link
          href="/profile"
          className="block max-[800px]:hidden w-5 h-5 -mt-1 relative rounded-full overflow-hidden ml-[14px] cursor-pointer border border-zinc-500 dark:border-white"
        >
          <LoggedinUserAvatar />
        </Link>
      ) : (
        <HiOutlineUserCircle
          size={22}
          className="dark:text-dark_text text-slate-700 -mt-1 cursor-pointer max-[800px]:hidden block ml-[14px]"
          onClick={openLoginModal}
        />
      )}
    </>
  );
};

export default UserAvatar;
