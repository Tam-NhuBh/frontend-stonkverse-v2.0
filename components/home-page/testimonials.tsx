"use client";

import { FC, useEffect, useState } from "react";
import VerticalTestimonialCard from "./vertical-testimonial-card";
import HorizontalTestimonialCard from "./horizontal-testimonial-card";
import TextTransition from "react-text-transition";

interface Props {}

const TEXTS = [
  "Programmers",
  "Marketers",
  "Youtubers",
  "TikTokers",
  "Designers",
];

const Testimonials: FC<Props> = (props): JSX.Element => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 1000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <section className="my-14 container max-[1000px]:hidden">
      <h3 className="section-title">
        <span className="text-gradient font-bold">Transform Your Life</span>{" "}
        Through Online Education
      </h3>
      <div className="grid grid-cols-3 gap-10">
        <VerticalTestimonialCard
          content="The ROI in my case, for about $1500 a year, I get
        to have $100,000 a year business."
          order={1}
          name="Roberto Blake"
          profession="Youtuber"
        />

        <div className="flex flex-col gap-12">
          <HorizontalTestimonialCard
            content="Even with less than 10,000 followers on Instagram, I was able to build a six figure business inside E-Learning."
            order={2}
            name="Shiny Burcu Unsal"
            profession="Mindset Coach Trainer"
          />

          <div className="flex flex-col justify-center items-center flex-1">
            <p className="text-2xl font-semibold text-tertiary dark:text-dark_text">
              Trusted By
            </p>
            <div className="main-gradient rounded-[5px] w-[200px] my-2">
              <TextTransition
                className="text-3xl my-4 text-white flex justify-center"
                translateValue="10%"
              >
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
            </div>
          </div>
        </div>

        <VerticalTestimonialCard
          content="You could easily 4X what you're making after 6 months or less than."
          order={3}
          name="Graham Cochrane"
          profession="Entrepreneur"
        />

        <HorizontalTestimonialCard
          content="I started seeing that I could have all theses streams of income."
          order={4}
          name="Jay Emme"
          profession="Ceilist"
        />

        <VerticalTestimonialCard
          content="It's been a beatiful way to diversify and have different streams of income."
          order={5}
          name="Steven Jaggers"
          profession="Speaker"
        />

        <HorizontalTestimonialCard
          content="There are some platforms out there that will take part of your revenue. E-Learning doesn't do that."
          order={6}
          name="Molly Rouse"
          profession="Entrepreneur"
        />
      </div>
    </section>
  );
};

export default Testimonials;
