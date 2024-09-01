import { IconType } from "react-icons";
import { AiOutlineLogout } from "react-icons/ai";
import { GiBookmark, GiPadlock } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
import { BiCalendarPlus } from "react-icons/bi";

export const profileItemsData: {
  icon: IconType;
  title: string;
  isLogout?: boolean;
}[] = [
  {
    icon: GiPadlock,
    title: "Change Password",
  },
  {
    icon: GiBookmark,
    title: "Enrolled Courses",
  },
  {
    icon: BiCalendarPlus,
    title: "My Learning Progress",
  },
  {
    icon: RiAdminLine,
    title: "Admin Dashboard",
  },
  {
    icon: AiOutlineLogout,
    title: "Log Out",
    isLogout: true,
  },
];
