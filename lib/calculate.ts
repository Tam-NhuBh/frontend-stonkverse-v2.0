import { IReview } from "@/types";

export const calculatePercentage = (
  reviewsArr: IReview[],
  numsOfStar: number
) => {
  const reviewNumsByStar = reviewsArr.filter(
    (r) => r.rating === numsOfStar || r.rating - 0.5 === numsOfStar
  );

  return ((reviewNumsByStar.length / reviewsArr.length) * 100).toFixed(1);
};
