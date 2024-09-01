import { getAllCoursesData} from "@/lib/fetch-data";
import { FC } from "react";
import CourseCard from "../course-card";
import { Types } from "mongoose";
import { ICourse } from "@/types";
import SearchBar from "./search-bar";
interface Props { }

export interface IFetchedCourse extends ICourse {
  _id: Types.ObjectId;

}


const Courses: FC<Props> = async (props): Promise<JSX.Element> => {
  const courses = (await getAllCoursesData()) as IFetchedCourse[];

  return (
    <section className="even-section">
      <div className="container">

        <div className="search-container mb-9"> {/* SearchBar */}
          <SearchBar />
        </div>

        <h2 className="section-title">
          <p>
            Unlock Your Investment Potential{" "}
            <span className="text-gradient font-bold"> with Our Stock Trading Courses</span>
          </p>
        </h2>

        <div className="main-grid">
          {courses?.map((course) => (
            <CourseCard key={course._id.toString()} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
