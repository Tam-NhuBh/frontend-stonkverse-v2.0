import { useSelector } from "react-redux";

export default function useUserInfo() {
  const { user } = useSelector((state: any) => state.auth);

  return user;
}
