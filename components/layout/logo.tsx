import Link from "next/link";
import { FC } from "react";
import { BiBarChart } from "react-icons/bi";

interface Props {}

const Logo: FC<Props> = (props): JSX.Element => {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 text-[23px] font-bold text-tertiary text-gradient py-3`}
    >
      <BiBarChart size={28} className="-mt-1 text-[#3d8fc0]" /> Stock E-Learning
    </Link>
  );
};

export default Logo;
