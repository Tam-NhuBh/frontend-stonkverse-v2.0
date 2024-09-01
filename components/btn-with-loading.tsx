import { FC } from "react";
import { ImSpinner } from "react-icons/im";

interface Props {
  isLoading: boolean;
  content: string;
  customClasses?: string;
  type?: "submit" | "button";
  onClick?: any;
  id?: string;
  disabled?: boolean;
}

const BtnWithLoading: FC<Props> = ({
  isLoading,
  content,
  customClasses,
  type,
  onClick,
  id,
  disabled,
}): JSX.Element => {
  return (
    <button
      className={`primary-btn w-full ${customClasses}`}
      type={type}
      onClick={onClick && onClick}
      id={id}
      disabled={disabled}
    >
      <span className="flex items-center justify-center gap-x-1">
        {isLoading ? (
          <>
            <ImSpinner className="animate-spin" size={18} />  Loading...
          </>
        ) : (
          <>{content}</>
        )}
      </span>
    </button>
  );
};

export default BtnWithLoading;
