"use client";

import { FC } from "react";
import NextImage from "../next-image";
import ReviewsSwiper from "./reviews-swiper";

interface Props {}

const Reviews: FC<Props> = (props): JSX.Element => {
  return (
    <section className="even-section  max-[1000px]:!bg-white max-[1000px]:dark:!bg-transparent">
      <div className="container grid grid-cols-2 gap-10 max-[1000px]:grid-cols-1 pt-6">
        <div className="w-[80%] max-w-[500px] aspect-square relative mx-auto">
          <NextImage
            src={"/assets/images/home-page/review-banner.png"}
            alt="Hero banner"
            className="z-10"
          />
          <div className="hero-animation w-full h-full absolute z-0 rounded-full transition"></div>
        </div>

        <div className="">
          <h3 className="section-title">
            <p>
              Our Students Are
              <span className="text-gradient font-bold"> Our Strength</span>
            </p>{" "}
            See What They Say About Us
          </h3>

          <ReviewsSwiper />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
