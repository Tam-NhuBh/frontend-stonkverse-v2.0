"use client";

import { FC, useEffect, useState } from "react";
import CourseInfomation from "./course-infomation";
import CourseOptions from "./course-options";
import CourseData from "./course-data";
import CourseContent from "./course-content";
import CoursePreview from "./course-preview";
import { useCreateCourseMutation } from "@/store/course/course-api";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface Props { }

export type CourseInfoValues = {
  name: string;
  description: string;
  // category: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
  curriculum: string
};

export const initialCourseInfo = {
  name: "",
  description: "",
  // category: "",
  price: "",
  estimatedPrice: "",
  tags: "",
  level: "",
  demoUrl: "",
  thumbnail: "",
  curriculum: ""
};

const initialCourseContentData = [
  {
    videoUrl: "",
    title: "",
    description: "",
    videoSection: "",
    videoLength: 0,
    links: [{ title: "", url: "" }],
    suggestion: "",
    quiz: [{title: "", correctAnswer: [""], mockAnswer: [""]}]
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

const CreateCourseForm: FC<Props> = (props): JSX.Element => {
  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState(initialCourseInfo);

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [forWho, setForWho] = useState([{ title: "" }]);

  const [courseContentData, setCourseContentData] = useState(
    initialCourseContentData
  );

  const [courseData, setCourseData] = useState({});

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

  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  const createCourseHandler = async () => {
    const data = courseData;
    if (!isLoading) {
      await createCourse(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created Course Successfully!");
      redirect("/admin/courses");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  return (
    <div className="flex">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfomation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}

        {/* {active === 1 && (
          <CourseCurriculumn
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )} */}
        
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
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
            createCourseHandler={createCourseHandler}
          />
        )}
      </div>
      <div className="flex-1 fixed z-[-1] top-[80px] right-8">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourseForm;
