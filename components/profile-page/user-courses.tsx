import { FC, useEffect, useState } from "react";
import { IFetchedCourse } from "../home-page/courses";
import LoadingSpinner from "../loading-spinner";
import useUserInfo from "@/hooks/useUserInfo";
import { getUserCoursesData } from "@/lib/fetch-data";
import CourseCard from "../course-card";
import NoContentYet from "../no-content-yet";

interface Props {}

const UserCourses: FC<Props> = (props): JSX.Element => {
  const [courses, setCourses] = useState<IFetchedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserInfo();
  const courseIds = user.courses.map((course: any) => course.courseId);

  const fetchUserCourses = async () => {
    setIsLoading(true);
    const fetchedCourses = await getUserCoursesData(courseIds);
    setCourses(fetchedCourses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {courses?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 max-[668px]:grid-cols-1 pb-12">
              {courses.map((course) => (
                <CourseCard key={course._id.toString()} course={course} />
              ))}
            </div>
          ) : (
            <NoContentYet
              description="You have not bought any courses"
              isSearch
            />
          )}
        </>
      )}
    </>
  );
};

export default UserCourses;
