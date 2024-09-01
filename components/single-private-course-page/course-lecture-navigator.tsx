import { FC } from "react";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";

interface Props {
  backHandler?: () => void;
  nextHandler?: () => void;
  customClasses?: string;
  onlyPrev?: boolean;
  onlyNext?: boolean;
}

const CourseLectureNavigator: FC<Props> = ({
  backHandler,
  nextHandler,
  customClasses,
  onlyNext,
  onlyPrev,
}): JSX.Element => {
  return (
    <div className={`flex justify-between my-8 ${customClasses}`}>
      <BtnWithIcon
        content="PREV LECTURE"
        type="button"
        onClick={backHandler}
        icon={BiSolidArrowToLeft}
        iconSize={25}
        iconCustomClasses="-mt-1"
        customClasses={`${onlyNext && "opacity-40 cursor-no-drop"}`}
      />
      <BtnWithIcon
        content="NEXT LECTURE"
        type="submit"
        onClick={nextHandler}
        iconBehind={BiSolidArrowToRight}
        iconSize={25}
        iconCustomClasses="-mt-1"
        customClasses={`${onlyPrev && "opacity-40 cursor-no-drop"} `}
      />
    </div>
  );
};

export default CourseLectureNavigator;
