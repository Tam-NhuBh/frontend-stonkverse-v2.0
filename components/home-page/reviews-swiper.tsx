import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { reviewItemsData } from "@/data/review-items";
import NextImage from "../next-image";

export default function ReviewsSwiper() {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="reviews-swiper"
      >
        {reviewItemsData.map((review, index) => (
          <SwiperSlide key={index} className="p-4">
            <div className="rounded-[5px] leading-7 dark:bg-slate-500 bg-white dark:bg-opacity-20 custom-shadow p-6 text-tertiary dark:text-dark_text cursor-pointer custom-hover">
              {review.comment}
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="w-14 h-14 rounded-full relative">
                <NextImage
                  src={review.avatar}
                  className="rounded-full"
                  alt={review.name}
                />
              </div>
              <p>
                {review.name} <span>{review.profession}</span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
