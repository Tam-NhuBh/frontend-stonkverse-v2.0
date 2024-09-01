"use client";

import { FC } from "react";
import Link from "next/link";
import NextImage from "./next-image";
import { FaListUl } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IFetchedCourse } from "./home-page/courses";
import StyledRating from "./styled-rating";

interface Props {
  course: IFetchedCourse;
}

const CourseCard: FC<Props> = ({ course }): JSX.Element => {
  return (
    <div className="rounded-[5px] shadow-md dark:border-none dark:bg-slate-500 bg-white dark:bg-opacity-20 custom-hover cursor-pointer">
      <Link
        href={`/course/${course._id}`}
        className="block relative w-full aspect-video"
      >
        <NextImage
          src={course.thumbnail.url}
          alt={course.name}
          className="rounded-t-[2px]" />
      </Link>

      <div className="p-4 dark:text-dark_text text-tertiary">
        <h3 className="font-semibold text-lg text-gradient line-clamp-2">
          <Link href={`/course/${course._id}`}>{course.name}</Link>
        </h3>
        <Link
          href={`/course/${course._id}`}
          className="flex justify-between my-2 max-[320px]:block"
        >
          <StyledRating
            defaultValue={course.ratings || 0}
            readOnly
            size="small"
            customClasses="mt-1" />

          <span className="flex text-sm items-center gap-1 font-normal text-tertiary dark:text-dark_text">
            <MdOutlinePeopleAlt className="-mt-[2px]" size={16} />/
            <span className="text-base">{course.purchased}</span> Students
          </span>
        </Link>

        <div className="flex justify-between my-2 max-[320px]:block">
          <div className="flex items-center">
            <span className="mr-2 font-bold text-2xl text-gradient">
              {course.price === 0 ? "Free" : "$" + course.price + ".00"}
            </span>

            {course.estimatedPrice && course.estimatedPrice > course.price && (
              <span className="line-through text-lg opacity-50">
                ${course.estimatedPrice}.00
              </span>
            )}
          </div>

          <span className="flex items-center gap-1 font-normal text-tertiary dark:text-dark_text text-sm">
            <FaListUl className="-mt-[3px]" size={13} />/
            <span className="text-base">{course.courseData.length}</span>{" "}
            Lectures
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
