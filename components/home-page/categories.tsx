import { getAllCategories } from "@/lib/fetch-data";
import { Types } from "mongoose";
import { FC } from "react";
import CategoryCard from "./category-card";

interface Props {}

export interface ICategory {
  title: string;
  courses: Types.ObjectId[];
  _id: Types.ObjectId;
}

const Categories: FC<Props> = async (props): Promise<JSX.Element> => {
  const categories = (await getAllCategories()) as ICategory[];

  return (
    <section className="my-14">
      <div className="container">
        <h2 className="section-title">
          Browse Top
          <span className="text-gradient font-bold"> Categories</span>
        </h2>

        <div className="main-grid">
          {categories.map((category, index) => (
            <CategoryCard
              category={category}
              key={category._id.toString()}
              order={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
