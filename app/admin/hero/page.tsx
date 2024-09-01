"use client";

import EditHero from "@/components/admin-pages/hero-page/edit-hero";
import AdminProtectedPage from "@/components/admin-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const HeroPage: NextPage<Props> = () => {
  const hasMounted = useMount();
  if (!hasMounted) return null;

  return (
    <AdminProtectedPage>
      <EditHero />
    </AdminProtectedPage>
  );
};

export default HeroPage;
