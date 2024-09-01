"use client";

import AllContacts from "@/components/admin-pages/contacts-page/all-contacts";
import ProtectedPage from "@/components/protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const AllContactsPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <ProtectedPage>
      <AllContacts />
    </ProtectedPage>
  );
};

export default AllContactsPage;
