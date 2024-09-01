import { FC } from "react";

interface Props {
  title?: string;
}

const Heading: FC<Props> = ({ title}): JSX.Element => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
};

export default Heading;
