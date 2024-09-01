import { navItemsData } from "@/data/nav-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Props {
  isMobile?: boolean;
}

const NavItems: FC<Props> = ({ isMobile }): JSX.Element => {
  const pathName = usePathname() as string;
  const route = pathName.split("/")[1];

  return (
    <div className={`${isMobile ? "flex flex-col" : "max-[800px]:hidden"}`}>
      {navItemsData.map((item, index) => (
        <Link href={item.url} key={index} className="py-5 leading-none">
          <span
            className={`${
              pathName === item.url ||
              (item.url.includes(route) && route.length > 1)
                ? "text-gradient font-bold border-b border-[#3d8fc0]"
                : "dark:text-dark_text text-slate-700"
            } text-lg mx-6`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
