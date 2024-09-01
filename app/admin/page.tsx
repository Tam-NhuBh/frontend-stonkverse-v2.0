"use client";

import DashboardHero from "@/components/admin-pages/dashboard-page/dashboard-hero";
import Heading from "@/components/heading";
import { NextPage } from "next";
import ProtectedPage from "@/components/protected-page";
import { useMount } from "@/hooks/useMount";
import AdminProtectedPage from "@/components/admin-protected-page";

interface Props {}

const DashboardPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <AdminProtectedPage>
      <Heading
        title="Admin Dashboard"
      />
      <DashboardHero isDashboard />
    </AdminProtectedPage>
  );
};

export default DashboardPage;
