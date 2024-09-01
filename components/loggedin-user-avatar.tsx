import useUserInfo from "@/hooks/useUserInfo";
import { FC } from "react";
import NextImage from "./next-image";

interface Props {
  customClasses?: string;
}

const LoggedinUserAvatar: FC<Props> = ({ customClasses }): JSX.Element => {
  const { avatar, name } = useUserInfo();
  return (
    <NextImage
      src={avatar ? avatar.url : "/assets/images/home-page/default-user.png"}
      alt={name}
      className={customClasses}
    />
  );
};

export default LoggedinUserAvatar;
