import { FC } from "react";
import StyledRating from "../styled-rating";
import { calculatePercentage } from "@/lib/calculate";
import { IReview } from "@/types";

interface Props {
  reviews: IReview[];
  averageRatings: number;
}

const stars = [5, 4, 3, 2, 1];

const AverageRating: FC<Props> = ({ reviews, averageRatings }): JSX.Element => {
  const formattedReviews = stars.map((s) => ({
    percentage: calculatePercentage(reviews, s),
  }));

  return (
    <div className="flex items-center my-4">
      <div className="flex flex-col w-[20%] justify-center items-center">
        <span className="font-bold text-[80px] leading-none text-[#b4690e] dark:text-[#faaf00]">
          {averageRatings}
        </span>
        <StyledRating defaultValue={averageRatings} readOnly size="medium" />
        <span className="text-[#b4690e] dark:text-[#faaf00] font-semibold text-lg">
          Course Rating
        </span>
      </div>
      <div className="flex-1">
        {formattedReviews.map((rating, index) => {
          return (
            <div className="flex items-center gap-8" key={index}>
              <div className="w-[75%] bg-[#d1d7dc] dark:bg-slate-400 h-3 relative rounded-sm">
                <div
                  className="absolute top-0 left-0 h-3 bg-[#6a6f73] dark:bg-slate-700"
                  style={{ width: `${rating.percentage}%` }}
                ></div>
              </div>

              <div className="flex-1 flex items-center gap-1">
                <StyledRating
                  defaultValue={5 - index}
                  readOnly
                  customClasses="mt-1"
                />
                <span className="">
                  {rating.percentage !== "NaN" ? rating.percentage : 0}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AverageRating;
