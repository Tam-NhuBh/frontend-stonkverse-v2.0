"use client";

import AdminProtectedPage from "@/components/admin-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";
import UsersAnalytics from "@/components/admin-pages/users-analytics-page/users-analytics";

interface Props {}

const UsersAnalyticsPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;
  return (
    <AdminProtectedPage title="Users Analytics">
      <UsersAnalytics />
    </AdminProtectedPage>
  );
};

export default UsersAnalyticsPage;
