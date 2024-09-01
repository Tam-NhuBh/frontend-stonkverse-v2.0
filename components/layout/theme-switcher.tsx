"use client";

import { useTheme } from "next-themes";
import { FC } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

interface Props {}

const ThemeSwitcher: FC<Props> = (props): JSX.Element | null => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center mx-4 cursor-pointer -mt-1 text-slate-700 dark:text-dark_text">
      {theme === "light" ? (
        <BiMoon size={21} onClick={() => setTheme("dark")} />
      ) : (
        <BiSun size={22} onClick={() => setTheme("light")} />
      )}
    </div>
  );
};

export default ThemeSwitcher;
