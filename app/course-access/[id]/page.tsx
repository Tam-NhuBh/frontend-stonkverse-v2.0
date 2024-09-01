"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import LoadingSpinner from "@/components/loading-spinner";
import PrivateCourseContent from "@/components/single-private-course-page/private-course-content";
import { useLoadUserQuery } from "@/store/api-slice";
import { useGetCourseContentQuery } from "@/store/course/course-api";
import { NextPage } from "next";
import { redirect } from "next/navigation";
// import { useEffect } from "react";
// import { IBreadCrumb } from "@/types"; 
import { ICourseData } from "@/types";
// import BreadCrumbsComp from "@/components/layout/breadcrumbs";

interface Props {
  params: { id: string };
}

const CoursePrivatePage: NextPage<Props> = ({ params }) => {
  const { id } = params;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  const getCourseContent = useGetCourseContentQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const courseData: ICourseData[] = getCourseContent?.data?.content;
  const courseDataLoading: boolean = getCourseContent?.isLoading;
  const courseContentRefetch = getCourseContent?.refetch;

  // const [breadcrumbs, setBreadcrumbs] = useState<IBreadCrumb[]>([]);

  useEffect(() => {
    if (data) {
      const isPurchased = data.user?.courses?.find(
        (course: { courseId: string }) => {
          return course.courseId === id;
        }
      );

      if (!isPurchased) {
        redirect("/");
      }

      if (error) {
        redirect("/");
      }

    }
  }, [data, error]);

  return (
    <>
      <Header />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <PrivateCourseContent
            id={id}
            courseData={courseData}
            courseDataLoading={courseDataLoading}
            refetch={courseContentRefetch}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default CoursePrivatePage;
