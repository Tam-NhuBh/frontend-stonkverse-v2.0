import BtnWithIcon from "@/components/btn-with-icon";
import { FC } from "react";

interface Props {
  backHandler?: () => void;
  nextHandler?: () => void;
  customClasses?: string;
  onlyPrev?: boolean;
  onlyNext?: boolean;
  isCreate?: boolean;
}

const BottomNavigator: FC<Props> = ({
  backHandler,
  nextHandler,
  customClasses,
  onlyPrev,
  onlyNext,
  isCreate,
}): JSX.Element => {
  return (
    <div
      className={`flex justify-between mt-5 ${customClasses} ${
        onlyNext && "!justify-end"
      }`}
    >
      <BtnWithIcon
        content="PREV"
        customClasses={`!rounded-sm ${onlyNext && "!hidden"}`}
        type="button"
        onClick={backHandler}
      />
      <BtnWithIcon
        content={isCreate ? "CONFIRM" : "NEXT"}
        customClasses={`!rounded-sm ${onlyPrev && "!hidden"}`}
        type="submit"
        onClick={nextHandler}
      />
    </div>
  );
};

export default BottomNavigator;
