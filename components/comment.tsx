"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import NextImage from "./next-image";
import { BsThreeDotsVertical } from "react-icons/bs";
import StyledRating from "./styled-rating";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import FormInput from "./form-input";
import BtnWithLoading from "./btn-with-loading";
import { addAnswer, addReviewReply } from "@/lib/mutation-data";
import toast from "react-hot-toast";
import BtnWithIcon from "./btn-with-icon";
import useIsAdmin from "@/hooks/useIsAdmin";
import CommentReply from "./comment-reply";
import useUserInfo from "@/hooks/useUserInfo";
import { IReply, IReview, IReviewReply } from "@/types";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

interface Props {
  contentId?: string;
  courseId?: string;
  avatar?: string;
  name: string;
  rating?: number;
  content: string;
  createdAt: Date;
  title?: string;
  isQuestion?: boolean;
  questionReplies?: IReply[];
  questionId?: string;
  refetch?: any;
  reviewId?: string;
  reviewReplies?: IReviewReply[];
  setReviews?: Dispatch<SetStateAction<IReview[]>>;
  activeTitle?: string;
  showReplyButton?: boolean
}

const Comment: FC<Props> = ({
  avatar,
  name,
  rating,
  content,
  createdAt,
  title,
  isQuestion,
  questionReplies,
  questionId,
  contentId,
  courseId,
  refetch,
  reviewId,
  reviewReplies,
  setReviews,
  activeTitle,
  showReplyButton = true
}): JSX.Element => {
  const isAdmin = useIsAdmin();
  const [openReplies, setOpenReplies] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitReplyHandler = async () => {
    try {
      if (!answer.trim().length) {
        toast.error("Please Enter Your Answer!");
        return;
      }

      setIsLoading(true);

      if (isQuestion) {
        const res = await addAnswer(
          answer,
          courseId as string,
          contentId as string,
          questionId as string
        );

        if (res.success) {
          setAnswer("");
          refetch();
        }
      } else {
        const res = await addReviewReply(
          answer,
          courseId as string,
          reviewId as string
        );

        if (res.success) {
          setAnswer("");
          const fetchedReviews = res.reviews as IReview[];
          if (fetchedReviews.length && setReviews) {
            setReviews(fetchedReviews);
          }
        }
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Cannot create answer with inappropriate content");

    }
  };

  return (
    <div className="border-y dark:border-slate-700 pt-5 pb-6 relative">
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 overflow-hidden rounded-full">
          <NextImage
            src={avatar || "/assets/images/home-page/default-user.png"}
            alt={name}
          />
        </div>

        <div>
          <span className="font-bold text-sm">{name}</span>
          <p className="flex items-center gap-2">
            {rating && (
              <StyledRating
                readOnly
                defaultValue={rating}
                customClasses="mt-1"
              />
            )}

            <span className="font-bold text-slate-500 text-xs">
              {timeAgo.format(new Date(createdAt))}
            </span>
          </p>
        </div>
      </div>

      {isQuestion && (
        <p className="mt-4 -mb-2 text-black dark:text-dark_text">
          <span className="font-bold">Summary: </span>
          {title}
        </p>
      )}

      <div className="text-sm text-slate-500 dark:text-dark_text mt-4">
        {content}
      </div>

      {(isQuestion || isAdmin) && showReplyButton && (
        <div className="flex items-center gap-4 mt-4 text-tertiary dark:text-secondary">
          <BtnWithIcon
            content={openReplies ? "Hide replies?" : "Reply this?"}
            customClasses="text-sm mt-1 cursor-pointer ml-auto"
            onClick={() => setOpenReplies((prev) => !prev)}
          />
        </div>
      )}

      {openReplies && (
        <div className="ml-10">
          <div className="mt-4 mb-6">
            {isQuestion && questionReplies?.map((reply) => (
              <CommentReply
                key={reply?._id?.toString()}
                avatar={reply?.user?.avatar?.url}
                name={reply?.user?.name}
                content={reply?.answer}
                createdAt={reply?.createdAt}
              />
            ))}
            {!isQuestion && reviewReplies?.map((reviewReply) => (
              <CommentReply
                key={reviewReply?._id?.toString()}
                avatar={reviewReply?.user?.avatar?.url}
                name={reviewReply?.user?.name}
                content={reviewReply?.answer}
                createdAt={reviewReply?.createdAt}
              />
            ))}

          </div>

          <FormInput
            textarea
            rows={5}
            id="reply"
            label="Write your response"
            placeholder="Eg: I think you shoud solve this problem by this way ..."
            value={answer}
            onChange={(e) => setAnswer(e?.target?.value)}
          />

          <div className="text-right -mt-4">
            <BtnWithLoading
              content="Add an answer"
              isLoading={isLoading}
              customClasses="!w-fit !text-sm"
              onClick={submitReplyHandler}
            />
          </div>
        </div>
      )}

      {/* <div className="absolute top-6 right-0 cursor-pointer group">
        <BsThreeDotsVertical />

        <div className="absolute top-6 -left-8 shadow-lg border py-2 px-3 z-10 hidden group-hover:block dark:bg-slate-800 bg-white before:absolute before:-top-2 before:-left-0 before:bg-transparent before:w-full before:h-[15px] :before:bg-transparent">
          <span className="text-sm">Report</span>
        </div>
      </div> */}
    </div>
  );
};

export default Comment;
