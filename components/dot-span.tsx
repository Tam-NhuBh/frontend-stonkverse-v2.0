import { FC } from "react";

interface Props {}

const DotSpan: FC<Props> = (props): JSX.Element => {
  return <span className="w-2 h-2 main-gradient rounded-full"></span>;
};

export default DotSpan;
