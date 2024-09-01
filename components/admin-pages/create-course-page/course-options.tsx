import { Dispatch, FC, SetStateAction } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

const options = [
  "Course Information",
  // "Course Curriculumn",
  "Course Options",
  "Course Content",
  "Course Preview",
];

const CourseOptions: FC<Props> = ({ active, setActive }): JSX.Element => {
  return (
    <div>
      {options.map((option, index) => (
        <div className="w-full flex mt-8 items-center" key={index}>
          <div
            className={`w-[35px] h-[35px] rounded-full grid place-items-center ${
              active + 1 > index ? "bg-[#3e4396]" : "bg-[#384766]"
            } relative text-dark_text`}
          >
            <IoMdCheckmark size={25} />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active > index ? "bg-[#3e4396]" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5 className={`pl-3 dark:text-dark_text text-black text-lg`}>
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
