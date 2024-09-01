import { FC, useEffect, useState } from "react";
import { getCourseReviews } from "@/lib/fetch-data";
import useUserInfo from "@/hooks/useUserInfo";
import AverageRating from "./average-rating";
import LoadingSpinner from "../loading-spinner";
import BtnWithIcon from "../btn-with-icon";
import { FaPlus } from "react-icons/fa";
import AddReviewModal from "./add-review-modal";
import Comment from "../comment";
import { IReview } from "@/types";

interface Props {
  courseId: string;
}

const CourseReviews: FC<Props> = ({ courseId }): JSX.Element => {
  const user = useUserInfo();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [averageRatings, setAverageRatings] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    setIsLoading(true);
    const data = await getCourseReviews(courseId);
    if (data) {
      const fetchedReviews = data.reviews as IReview[];
      setReviews(fetchedReviews);
      setAverageRatings(data.ratings);

      const reviewExists = fetchedReviews.find((review) => {
        return review.user?._id === user?._id;
      });
      setHasReviewed(!!reviewExists); //(reviewExists !== undefined)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {!hasReviewed && (
            <div className="text-center mt-4 mb-8">
              <p className="mb-1">How would you rate this course?</p>
              <BtnWithIcon
                content="Add Your Review"
                onClick={() => setOpenModal(true)}
                icon={FaPlus}
                iconCustomClasses="-mt-[2px]"
              />
            </div>
          )}

          <AverageRating reviews={reviews} averageRatings={averageRatings} />

          <div className="mt-12">
            {reviews.map((review, index) => (
              <Comment
                reviewId={review._id?.toString()}
                key={review._id?.toString()}
                name={review.user?.name}
                avatar={review.user?.avatar?.url}
                content={review?.comment}
                rating={review?.rating}
                createdAt={review?.createdAt}
                reviewReplies={review?.commentReplies}
                setReviews={setReviews}
                courseId={courseId}
              />
            ))}
          </div>

          {openModal && (
            <AddReviewModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              comment={comment}
              setComment={setComment}
              courseId={courseId}
              setReviews={setReviews}
              setAverageRatings={setAverageRatings}
              setHasReviewed={setHasReviewed}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CourseReviews;
