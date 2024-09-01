"use client";
import Heading from "@/components/heading";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Profile from "@/components/profile-page/profile";
import ProtectedPage from "@/components/protected-page";
import { useMount } from "@/hooks/useMount";
import useUserInfo from "@/hooks/useUserInfo";
import { NextPage } from "next";

interface Props {}

const ProfilePage: NextPage<Props> = () => {
  const user = useUserInfo();

  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <ProtectedPage>
      <Heading
        title={`${user.name} Profile`}
     />
      <Header />
      <div className="min-h-screen">
        <div className="mt-8 container">
          <Profile />
        </div>
      </div>
      <Footer />
    </ProtectedPage>
  );
};

export default ProfilePage;
