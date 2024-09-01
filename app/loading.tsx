import { NextPage } from "next";

interface Props {}

const Loading: NextPage<Props> = () => {
  return (
    <div className="relative dark:bg-tertiary min-h-screen overflow-hidden">
      <div className="loading-page-body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="loading-page-base">
          <span></span>
          <div className="loading-page-face"></div>
        </div>
      </div>
      <div className="loading-page-longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="absolute font-bold text-lg text-tertiary dark:text-secondary uppercase left-1/2 top-[58%] -ml-10">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;
