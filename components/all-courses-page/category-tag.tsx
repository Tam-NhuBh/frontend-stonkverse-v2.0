import Link from "next/link";
import { FC } from "react";
import { ICategory } from "../home-page/categories";
import { categoryColorsData } from "@/data/category-item";

interface Props {
  categories: ICategory[];
  exclude?: string;
  allCourses?: boolean;
}

const CategoryTag: FC<Props> = ({
  categories,
  exclude,
  allCourses,
}): JSX.Element => {
  const excludedCategories = categories.filter(
    (category) => category.title !== exclude
  );
  return (
    <div className="flex flex-wrap gap-3">
      {!allCourses && (
        <Link href="/courses" className="category-tag bg-[#174d5e]">
          All Courses
        </Link>
      )}
      {excludedCategories.map((category, index) => (
        <Link
          key={category._id.toString()}
          href={`/courses/${category.title.toLowerCase().replace(/ /g, "-")}`}
          className="category-tag"
          style={{ background: categoryColorsData[index] }}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTag;
