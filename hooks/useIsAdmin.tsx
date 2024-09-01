import { useSelector } from "react-redux";

export default function useIsAdmin() {
  const { user } = useSelector((state: any) => state.auth);

  return user.role === "admin";
}
