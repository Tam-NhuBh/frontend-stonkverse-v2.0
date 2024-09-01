import { FC } from "react";
import ContainNextImage from "../contain-next-image";

interface Props {
  content: { title: string; description: string };
  order: number;
}

const FeatureCard: FC<Props> = ({ content, order }): JSX.Element => {
  return (
    <div className="shadow-md rounded-[5px] border dark:border-none dark:bg-slate-500 bg-white dark:bg-opacity-20 text-center py-6 px-10 custom-hover cursor-pointer">
      <div className="w-[65%] aspect-square relative mx-auto mb-6">
        <ContainNextImage
          src={`/assets/images/home-page/feature-${order}.svg`}
          alt={content.title}
        />
      </div>

      <h5 className="font-semibold text-gradient text-xl mb-3">
        {content.title}
      </h5>

      <p className="dark:text-dark_text text-[#646464] leading-7">
        {content.description}
      </p>
    </div>
  );
};

export default FeatureCard;
