"use client";

import { FC, useEffect, useState } from "react";
import NavItems from "./nav-items";
import ThemeSwitcher from "./theme-switcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import CustomModal from "../custom-modal";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Verification from "../auth/verification";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/store/auth/auth-api";
import toast from "react-hot-toast";
import UserAvatar from "./user-avatar";
import MobileSidebar from "./mobile-sidebar";
import Logo from "./logo";
import { useMount } from "@/hooks/useMount";
import { useLoadUserQuery } from "@/store/api-slice";
import BreadCrumbsComp from "./breadcrumbs";

interface Props { }

const Header: FC<Props> = (): JSX.Element | null => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { user, token } = useSelector((state: any) => state.auth);
  const { data } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const openLoginModal = () => {
    setOpenModal(true);
    setRoute("login");
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    if (!user) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
        }
        refetch();
      }
    }
  }, [data, userData, user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully!");
    }
  }, [isSuccess]);

  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <div className="w-full relative">
      <div
        className={`${active
          ? "dark:bg-opacity-50 dark-bg dark:border-[#ffffff1c] shadow-xl"
          : "dark:border-[#ffffff1c] dark:shadow"
          } z-[80] fixed top-0 left-0 right-0 bg-white dark:bg-transparent transition duration-500 border-b`}
      
      >
        <div className="container flex items-center justify-between">

          <Logo />

          <div className="flex items-center">
            <NavItems />
            <ThemeSwitcher />

            <div
              className="hidden max-[800px]:block"
              onClick={() => setOpen(true)}
            >
              <HiOutlineMenuAlt3
                size={21}
                className="dark:text-dark_text text-slate-700 cursor-pointer -mt-1"
              />
            </div>

            {/* Avatar */}
            <UserAvatar openLoginModal={openLoginModal} />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          open={open}
          setOpen={setOpen}
          openLoginModal={openLoginModal}
        />
      </div>

      {
        openModal && (
          <>
            {route === "login" && (
              <CustomModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                setRoute={setRoute}
                Component={Login}
                refetch={refetch}
              />
            )}

            {route === "signup" && (
              <CustomModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                setRoute={setRoute}
                Component={Signup}
              />
            )}

            {route === "verification" && (
              <CustomModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                setRoute={setRoute}
                Component={Verification}
              />
            )}
          </>
        )
      }
      <div className="breadcrumbs-container">
        <div className="breadcrumbs-content">
          <BreadCrumbsComp />
        </div>
      </div>
    </div >

  );
};

export default Header;
