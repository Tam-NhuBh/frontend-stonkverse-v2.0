import { FC } from "react";
import NextImage from "../next-image";

interface Props {
  content: string;
  order: number;
  name: string;
  profession: string;
}

const VerticalTestimonialCard: FC<Props> = ({
  content,
  order,
  name,
  profession,
}): JSX.Element => {
  return (
    <div className="custom-shadow rounded-[5px] w-[70%] mx-auto overflow-hidden flex flex-col custom-hover cursor-pointer">
      <div className="main-gradient text-dark_text p-4 text-lg h-1/2">
        <p>{content}</p>

        <div className="text-right mt-6">
          <p className="text-sm font-semibold">{name}</p>
          <p className="font-serif opacity-70 text-sm">{profession}</p>
        </div>
      </div>

      <div className="relative aspect-[1.2] flex-1">
        <NextImage
          src={`/assets/images/home-page/customer-${order}.jpg`}
          alt={`Customer ${order}`}
        />
      </div>
    </div>
  );
};

export default VerticalTestimonialCard;
