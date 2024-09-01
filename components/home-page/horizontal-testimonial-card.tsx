import { FC } from "react";
import NextImage from "../next-image";

interface Props {
  content: string;
  order: number;
  name: string;
  profession: string;
}

const HorizontalTestimonialCard: FC<Props> = ({
  content,
  order,
  name,
  profession,
}): JSX.Element => {
  return (
    <div className="mt-6 custom-shadow rounded-[5px] overflow-hidden flex w-full h-fit bg-white dark:bg-slate-500 dark:bg-opacity-20 hover:-translate-y-2 transition duration-500 cursor-pointer">
      <div className="relative w-[45%] aspect-[0.9]">
        <NextImage
          src={`/assets/images/home-page/customer-${order}.jpg`}
          alt={`Customer ${order}`}
        />
      </div>

      <div className="text-dark_text p-4 text-lg flex-1 text-gradient">
        <p>{content}</p>

        <div className="text-right mt-6">
          <p className="text-sm font-semibold dark:!text-dark_text">{name}</p>
          <p className="font-serif opacity-70 text-sm text-gradient">
            {profession}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTestimonialCard;
