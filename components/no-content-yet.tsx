import { FC } from "react";
import ContainNextImage from "./contain-next-image";

interface Props {
  description: string;
  isSearch?: boolean;
}

const NoContentYet: FC<Props> = ({ description, isSearch }): JSX.Element => {
  return (
    <div>
      <div className="relative w-[70%] mx-auto aspect-[1.5] my-10">
        <ContainNextImage
          src={
            isSearch
              ? "/assets/images/course-page/not-found.svg"
              : "/assets/images/course-page/no-review.svg"
          }
          alt="No reviews yet"
        />
      </div>
      <p className="text-center text-xl">{description}</p>
    </div>
  );
};

export default NoContentYet;
