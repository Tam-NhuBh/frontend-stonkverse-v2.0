import useIsAdmin from "@/hooks/useIsAdmin";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import Heading from "./heading";

interface Props {
  children: ReactNode;
  title?: string;
}

const AdminProtectedPage: FC<Props> = ({ children, title }) => {
  const isAdmin = useIsAdmin();

  return isAdmin ? (
    <>
      <Heading title={title} />
      {children}
    </>
  ) : (
    redirect("/")
  );
};

export default AdminProtectedPage;
