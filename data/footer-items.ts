import { linkConstants } from "@/constants";
import { IconType } from "react-icons";
import { MdMail, MdPhone } from "react-icons/md";

type footerItemType = { title: string; link: string };

export const footerCol1: { title: string; content: string }[] = [
  {
    title: "Address",
    content: "No 1 Vo Van Ngan Street, Linh Chieu Ward, Thu Duc District, Ho Chi Minh City",
  },
];

// export const footerCol2: footerItemType[] = [
//   { title: "News", link: linkConstants.privacy },
//   { title: "Stocks", link: linkConstants.privacy },
//   { title: "Bonds", link: linkConstants.privacy },
//   { title: "Company", link: linkConstants.privacy },
//   { title: "Economy", link: linkConstants.privacy },
//   { title: "Finance", link: linkConstants.privacy },
// ];

// export const footerCol3: footerItemType[] = [
//   { title: "Privacy Policy", link: linkConstants.policy },
//   { title: "Terms of Use", link: linkConstants.policy },
// ];


export const footerCol4: { title: string; link: string, icon: IconType }[] = [
  {
    title: "Hotline : 02838968641",
    link: "tele:02838968641",
    icon: MdPhone
  },
  {
    title: "tnbh234@gmail.com",
    link: "mailto:tnbh234@gmail.com",
    icon: MdMail,
  },
];
