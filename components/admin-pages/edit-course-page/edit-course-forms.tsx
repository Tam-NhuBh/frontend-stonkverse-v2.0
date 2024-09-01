"use client";

import { FC, useEffect, useState } from "react";
import {
  useEditCourseMutation,
  useGetSingleCourseQuery,
} from "@/store/course/course-api";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import CourseInfomation from "../create-course-page/course-infomation";
import CourseData from "../create-course-page/course-data";
import CoursePreview from "../create-course-page/course-preview";
import CourseOptions from "../create-course-page/course-options";
import CourseContent from "../create-course-page/course-content";

interface Props {}

export type CourseInfoValues = {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
  curriculum: string;
};

export const initialCourseInfo = {
  name: "",
  description: "",
  price: "",
  estimatedPrice: "",
  tags: "",
  level: "",
  demoUrl: "",
  thumbnail: "",
  curriculum: "",
};

const initialCourseContentData = [
  {
    videoUrl: "",
    title: "",
    description: "",
    videoSection: "Untitled Section",
    videoLength: 0,
    links: [{ title: "", url: "" }],
    suggestion: "",
    quiz: [{ title: "", correctAnswer: [""], mockAnswer: [""] }],
  },
];

export type CourseContentDataType = {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength: number;
  links: {
    title: string;
    url: string;
  }[];
  suggestion: string;
  quiz: {
    title: string,
    correctAnswer: string[],
    mockAnswer: string[],
  }[];
}[];

const EditCourseForms: FC<Props> = (props): JSX.Element => {
  const id = useParams()?.id;

  const {
    isLoading: fetchInitialDataLoading,
    data,
    refetch,
  } = useGetSingleCourseQuery(id, { refetchOnMountOrArgChange: true });

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState(initialCourseInfo);

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [forWho, setForWho] = useState([{ title: "" }]);

  const [courseContentData, setCourseContentData] = useState(
    initialCourseContentData
  );

  const [courseData, setCourseData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async () => {
    const data = {
      ...courseInfo,
      totalVideos: courseContentData.length,
      benefits,
      prerequisites,
      forWho,
      courseData: courseContentData,
    };

    setCourseData(data);
  };

  const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();

  const editCourseHandler = async () => {
    setIsSubmitting(true);
    const data = courseData;

    if (!isLoading) {
      await editCourse({ id, data });
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (data?.courseData && data?.courseData.length) {
      setCourseContentData(data?.courseData);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Edit Course Successfully!");
      redirect("/admin/courses");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (fetchInitialDataLoading) {
      toast.loading("Loading course data...");
    } else {
      toast.dismiss();
    }
  }, [fetchInitialDataLoading]);

  return (
    <div className="flex">
      <div className="w-[80%]">
        {fetchInitialDataLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {active === 0 && (
              <CourseInfomation
                active={active}
                setActive={setActive}
                initialCourseInfo={data}
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
              />
            )}

            {active === 1 && (
              <CourseData
                active={active}
                setActive={setActive}
                initialBenefits={data.benefits}
                initialPrerequisites={data.prerequisites}
                initialForWho={data.forWho}
                benefits={benefits}
                setBenefits={setBenefits}
                prerequisites={prerequisites}
                setPrerequisites={setPrerequisites}
                forWho={forWho}
                setForWho={setForWho}
              />
            )}

            {active === 2 && (
              <CourseContent
                active={active}
                setActive={setActive}
                courseContentData={courseContentData}
                setCourseContentData={setCourseContentData}
                submitCourseHandler={submitHandler}
              />
            )}

            {active === 3 && (
              <CoursePreview
                active={active}
                setActive={setActive}
                courseData={courseData}
                courseContentData={courseContentData}
                createCourseHandler={editCourseHandler}
              />
            )}
          </>
        )}
      </div>
      <div className="flex-1 fixed z-[-1] top-[80px] right-8">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourseForms;
