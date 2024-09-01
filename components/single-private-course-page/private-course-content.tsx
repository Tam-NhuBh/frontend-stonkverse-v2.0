"use client";

import { FC, useState } from "react";
import LoadingSpinner from "../loading-spinner";
import Heading from "../heading";
import CourseContentMedia from "./course-content-media";
import { ICourseData } from "@/types";

interface Props {
  id: string;
  courseData: ICourseData[];
  courseDataLoading: boolean;
  refetch: any;
}

const PrivateCourseContent: FC<Props> = ({
  id,
  courseData,
  courseDataLoading,
  refetch,
}): JSX.Element => {
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {courseDataLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Heading
            title={`${courseData?.[activeVideo]?.title}`}
          />

          <div className="col-span-7">
            <CourseContentMedia
              courseId={id}
              courseData={courseData}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              refetch={refetch}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PrivateCourseContent;
