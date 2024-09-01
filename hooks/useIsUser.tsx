import { useSelector } from "react-redux";

export default function useIsUser() {
  const { user } = useSelector((state: any) => state.auth);

  return !!user;
}
