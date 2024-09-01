"use client";

import Image, { StaticImageData } from "next/image";
import { FC, useState } from "react";

interface Props {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
}

const common = "duration-700 ease-in-out";

const ContainNextImage: FC<Props> = ({
  src,
  alt,
  className,
  priority,
}): JSX.Element => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      fill={true}
      style={{
        objectFit: "contain",
        objectPosition: "center",
      }}
      className={`${className} ${common} ${
        isLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0"
      }`}
      onLoadingComplete={() => setLoading(false)}
      priority={priority}
    />
  );
};

export default ContainNextImage;
