"use client";

import AllAdmins from "@/components/admin-pages/team-page/all-admin";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const TeamPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <div>
      <AllAdmins />
    </div>
  );
};

export default TeamPage;
