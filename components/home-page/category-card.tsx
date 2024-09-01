import { FC } from "react";
import { ICategory } from "./categories";
import NextImage from "../next-image";
import Link from "next/link";

interface Props {
  category: ICategory;
  order: number;
}

const CategoryCard: FC<Props> = ({ category, order }): JSX.Element => {
  return (
    <div className="custom-shadow rounded-[5px] overflow-hidden flex items-center w-full hover:-translate-y-1 transition duration-500 bg-white dark:bg-slate-500 dark:bg-opacity-20">
      <Link
        href={`/courses/${category.title.toLowerCase().replace(/ /g, "-")}`}
        className="w-20 h-20 relative"
      >
        <NextImage
          src={`/assets/images/home-page/category-${order}.jpg`}
          alt={category.title}
        />
      </Link>

      <div className="flex-1 px-6 py-2">
        <h5>
          <Link
            href={`/courses/${category.title.toLowerCase().replace(/ /g, "-")}`}
            className="block"
          >
            {category.title}
          </Link>
        </h5>
        <p>
          <Link
            href={`/courses/${category.title.toLowerCase().replace(/ /g, "-")}`}
            className="block"
          >
            {category.courses.length} Courses
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
