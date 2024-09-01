"use client";

import CourseCard from "@/components/course-card";
import Heading from "@/components/heading";
import { IFetchedCourse } from "@/components/home-page/courses";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import LoadingSpinner from "@/components/loading-spinner";
import NoContentYet from "@/components/no-content-yet";
import { getCoursesByQuery } from "@/lib/fetch-data";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {
  params: { query: string };
}

const SearchResultPage: NextPage<Props> = ({ params }) => {
  const { query } = params;
  const [courses, setCourses] = useState<IFetchedCourse[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    const fetchedCourses: IFetchedCourse[] = await getCoursesByQuery(query);
    setCourses(fetchedCourses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Heading
        // title={`Resutls for ${query}`}
        title={`Resutls for searching`}

      />
      <div className="min-h-screen">
        <Header />
        <div className="container mt-8 mb-14">
          <h2 className="section-title">
            <p className="font-semibold text-tertiary dark:text-dark_text text-left mb-6 text-lg">
             
              <span className="text-gradient font-bold">
                {courses?.length ? courses.length : 0} Courses
              </span>{" "}
              available for you
            </p>
          </h2>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {courses?.length ? (
                <div className="main-grid mt-10">
                  {courses.map((course) => (
                    <CourseCard key={course._id.toString()} course={course} />
                  ))}
                </div>
              ) : (
                <NoContentYet description="" isSearch />
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchResultPage;
