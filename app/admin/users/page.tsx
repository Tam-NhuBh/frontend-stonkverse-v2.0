"use client";

import AllUsers from "@/components/admin-pages/users-page/all-users";
import ProtectedPage from "@/components/protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const UsersPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <ProtectedPage>
      <AllUsers />
    </ProtectedPage>
  );
};

export default UsersPage;
