import Link from "next/link";
import { FC, FormEvent } from "react";
import { IconType } from "react-icons";

interface Props {
  onClick?: any;
  content: string;
  icon?: IconType;
  iconBehind?: IconType;
  iconSize?: number;
  href?: string;
  customClasses?: string;
  type?: string;
  to?: string;
  external?: boolean;
  iconCustomClasses?: string;
  disabled?: boolean;
}

const BtnWithIcon: FC<Props> = ({
  onClick,
  content,
  icon,
  iconBehind,
  href,
  iconSize,
  customClasses,
  type,
  to,
  external,
  iconCustomClasses,
  disabled,
}): JSX.Element => {
  let Component = "button" as any;
  if (!onClick && href) {
    Component = "a" as any;
  }

  if (!onClick && to) {
    Component = Link as any;
  }

  let externalLinkAttr = {};
  if (external) {
    externalLinkAttr = { target: "_blank", rel: "noopener noreferrer" };
  }

  return (
    <Component
      href={href || to}
      onClick={onClick}
      className={`primary-btn ${customClasses}`}
      type={type}
      disabled={disabled}
      {...externalLinkAttr}
    >
      <span className="flex items-center justify-center gap-x-1">
        {icon && icon({ size: iconSize, className: iconCustomClasses })}
        {content}

        {iconBehind &&
          iconBehind({ size: iconSize, className: iconCustomClasses })}
      </span>
    </Component>
  );
};

export default BtnWithIcon;
