import { FC, ReactNode } from "react";
import { redirect } from "next/navigation";
import useIsUser from "@/hooks/useIsUser";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

const ProtectedPage: FC<Props> = ({ children }) => {
  const { user } = useSelector((state: any) => state.auth);
  return user ? children : redirect("/");
};

export default ProtectedPage;
