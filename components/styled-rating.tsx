import * as React from "react";
import Rating from "@mui/material/Rating";

interface Props {
  defaultValue: number;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
  customClasses?: string;
  precision?: number;
}

export default function StyledRating({
  defaultValue,
  readOnly,
  size,
  customClasses,
  precision,
}: Props) {
  const [value, setValue] = React.useState<number | null>(defaultValue);

  return (
    <div className={customClasses}>
      <Rating
        size={size || "small"}
        readOnly={readOnly}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        precision={precision || 0.5}
      />
    </div>
  );
}
