import { FC } from "react";
import NextImage from "../next-image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
// import SearchBar from "./search-bar";

interface Props { }

const Hero: FC<Props> = async (props): Promise<JSX.Element> => {
  return (
    <div className="container grid grid-cols-2 gap-10 mt-8 max-[1000px]:grid-cols-1">
      {/* <div className="w-[80%] max-w-[500px] aspect-square relative mx-auto">
        <NextImage src={layoutData.image.url} alt="Hero banner" priority />
        <div className="hero-animation w-full h-full absolute -z-10 rounded-full transition"></div>
      </div> */}

      <div className="w-[90%] mx-auto flex flex-col justify-center">
        <h1 className="capitalize dark:text-dark_text text-tertiary text-4xl leading-[60px] font-semibold">
          The Only <span className="text-gradient"> Stock E-Learning Platform</span>, The Key To Unlocking Financial Success
        </h1>
        <p className="dark:text-[#edfff4] text-[#000000ac] text-medium mt-6">
          We have 90K+ Online course &amp; 500K+ Online registered student. Find your desired Courses from theme.
        </p>

        {/* <SearchBar /> */}

        <div className="mt-4 flex items-center gap-2">
          <div className="w-10 aspect-square relative rounded-full overflow-hidden">
            <NextImage
              src="/assets/images/home-page/client-1.jpg"
              alt="Client 1"
            />
          </div>
          <div className="w-10 aspect-square relative rounded-full overflow-hidden -ml-5">
            <NextImage
              src="/assets/images/home-page/client-2.jpg"
              alt="Client 2"
            />
          </div>
          <div className="w-10 aspect-square relative rounded-full overflow-hidden -ml-5">
            <NextImage
              src="/assets/images/home-page/client-3.jpg"
              alt="Client3"
            />
          </div>
          <p className="font-josefin text-slate-700 dark:text-dark_text">
            500K+ People already trusted us.&nbsp;
            <Link href="/courses" className="text-gradient font-bold">
              View Courses For Beginners
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
