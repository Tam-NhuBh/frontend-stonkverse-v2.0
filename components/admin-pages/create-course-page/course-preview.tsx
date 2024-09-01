import { Dispatch, FC, SetStateAction } from "react";
import CoursePlayer from "../../course-player";
import BtnWithIcon from "@/components/btn-with-icon";
import DotSpan from "@/components/dot-span";
import { formatShortDate, formatVideoLength } from "@/lib/format-data";
import LoggedinUserAvatar from "@/components/loggedin-user-avatar";
import useUserInfo from "@/hooks/useUserInfo";
import { MdKey, MdLiveTv, MdOutlineSource } from "react-icons/md";
import { CgTimelapse } from "react-icons/cg";
import { RiFileList2Line } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import CourseContentTabs from "./course-content-tabs";
import {
  BiBarChartAlt2,
  BiCommentDetail,
  BiSolidStar,
  BiStar,
} from "react-icons/bi";
import Comment from "@/components/comment";
import BottomNavigator from "./bottom-navigator";

interface Props {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  courseData: any;
  courseContentData: any;
  createCourseHandler: () => void;
}

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  courseContentData,
  createCourseHandler,
}): JSX.Element => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const user = useUserInfo();

  const backHandler = () => {
    setActive(active - 1);
  };

  const courseLength: number = courseContentData.reduce(
    (acc: any, cur: any) => {
      return acc + cur.videoLength;
    },
    0
  );

  return (
    <div className="w-[85%] mx-auto mt-8 my-12">
      <div className="w-full flex gap-8">
        <div className="w-[60%]">
          <h1 className="text-tertiary dark:text-dark_text text-2xl font-bold">
            {courseData?.name}
          </h1>

          <div className="flex items-center mt-6 gap-4 flex-wrap">
            <div className="dark:bg-secondary/70 bg-tertiary/70 text-dark_text w-fit px-2 py-1 rounded-[5px]">
              {courseData?.tags}
            </div>

            <div className="flex items-center gap-1">
              <DotSpan /> <span>3</span>{" "}
              <span className="text-slate-500">Students</span>
            </div>

            <div className="flex items-center gap-1">
              <DotSpan /> <span className="text-slate-500">Last updated</span>{" "}
              <span>{formatShortDate(Date.now())}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden relative mt-6">
              <LoggedinUserAvatar />
            </div>
            <span className="mt-6 text-slate-500 dark:text-dark_text">
              Created By{" "}
              <b className="text-tertiary dark:text-secondary">{user.name}</b>
            </span>
          </div>

          <h2 className="mt-8 font-bold text-xl mb-3">
            What You&apos;ll Learn In This Course
          </h2>
          <ul className="list-disc text-slate-500 dark:text-dark_text space-y-2">
            {courseData.benefits?.map(
              (benefit: { title: string }, index: number) => (
                <li key={index} className="ml-4">
                  {benefit.title}
                </li>
              )
            )}
          </ul>

          <div className="mt-10">
            <CourseContentTabs
              prerequisites={courseData.prerequisites as { title: string }[]}
              forWho={courseData.forWho as { title: string }[]}
              description={courseData.description as string}
              curr={courseData.curriculum.url as string}

            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <p className="flex items-center gap-1 font-bold text-xl">
              <BiSolidStar
                color=""
                className="-mt-1 !text-[#b4690e] dark:!text-[#faaf00]"
              />
              <span>{courseData.ratings} course rating</span>
            </p>

            <DotSpan />

            <p className="font-bold text-xl">0 reviews</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Comment
              name="Irfani S."
              avatar="https://res.cloudinary.com/dfhheac8o/image/upload/v1696561586/avatars/qtwgyytoxntruc8hkfr6.png"
              content="I recently completed the WordPress Theme Development from Scratch 2.0 course on Udemy, and I cannot praise it enough! This course is an absolute gem for anyone looking to dive into WordPress theme"
              rating={4.5}
              createdAt={new Date("2022-03-25")}
            />

            <Comment
              name="Irfani S."
              avatar="https://res.cloudinary.com/dfhheac8o/image/upload/v1696561586/avatars/qtwgyytoxntruc8hkfr6.png"
              content="I recently completed the WordPress Theme Development from Scratch 2.0 course on Udemy, and I cannot praise it enough! This course is an absolute gem for anyone looking to dive into WordPress theme"
              rating={4.5}
              createdAt={new Date("2022-03-25")}
            />
          </div>
        </div>

        <div className="flex-1 shadow-md dark:border dark:border-slate-700 z-0">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />

          <div className="mt-2 p-4 gap-2 relative">
            <div className="flex items-center">
              <span className="mr-2 font-bold text-3xl dark:text-secondary text-tertiary">
                {courseData?.price === 0 ? "Free" : courseData.price + ".00"}
              </span>

              {courseData?.estimatedPrice > courseData?.price && (
                <span className="line-through text-xl opacity-50">
                  ${courseData?.estimatedPrice}.00
                </span>
              )}

              {courseData?.estimatedPrice > courseData?.price && (
                <span className="ml-auto text-slate-500 font-bold">
                  Discount {discountPercentagePrice}%
                </span>
              )}
            </div>

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <BiCommentDetail className="dark:text-secondary -mt-[2px]" />
                Reviews
              </span>
              <span className="font-bold text-slate-500">0 Review</span>
            </div>

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <BiStar className="dark:text-secondary -mt-1" />
                Rating
              </span>
              <span className="font-bold text-slate-500 ">4.5 Scores</span>
            </div>

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <MdLiveTv className="dark:text-secondary -mt-1" />
                Live Class
              </span>
              <span className="font-bold text-slate-500">No</span>
            </div>

            {/* <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <BiBarChartAlt2 className="dark:text-secondary -mt-1" />
                Category
              </span>
              <span className="font-bold text-slate-500">
                {courseData.category}
              </span>
            </div> */}

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <CgTimelapse className="dark:text-secondary -mt-[2px]" />
                Duration
              </span>
              <span className="font-bold text-slate-500">
                {formatVideoLength(courseLength)}
              </span>
            </div>

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <RiFileList2Line className="dark:text-secondary -mt-[2px]" />
                Lectures
              </span>
              <span className="font-bold text-slate-500">
                {courseData.totalVideos} Lecture
              </span>
            </div>

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <MdOutlineSource className="dark:text-secondary -mt-1" />
                Resource
              </span>
              <span className="font-bold text-slate-500">1 Downloadable</span>
            </div>

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <PiStudentBold className="dark:text-secondary -mt-1" />
                Students
              </span>
              <span className="font-bold text-slate-500">2 Students</span>
            </div>

            <div className="course-info-item">
              <span className="flex gap-1 items-center">
                <MdKey className="dark:text-secondary -mt-1" />
                Access
              </span>
              <span className="font-bold text-slate-500">Lifetime</span>
            </div>

            <p className="underline text-center mt-4 mb-2">Apply coupon</p>
            <div className="flex items-center h-[45px]">
              <input
                type="text"
                placeholder="Enter Coupon"
                className="flex-1 bg-[#f5f5f5] px-4 h-full py-3 rounded-l-[5px] outline-none text-tertiary"
              />
              <BtnWithIcon
                content="Apply"
                customClasses="!rounded-l-none !h-full"
              />
            </div>
            <BtnWithIcon content="Buy Now" customClasses="w-full mt-4" />

            <p className="text-slate-500 dark:text-dark_text text-sm mt-6 mb-4 text-center">
              {/* 30-Day Money-Back Guarantee */}
            </p>
          </div>
        </div>
      </div>

      <BottomNavigator
        backHandler={backHandler}
        nextHandler={createCourseHandler}
        isCreate
      />
    </div>
  );
};

export default CoursePreview;
