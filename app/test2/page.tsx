import BtnWithIcon from "@/components/btn-with-icon";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import NextImage from "@/components/next-image";
import { NextPage } from "next";

interface Props {}

const page: NextPage<Props> = () => {
  return (
    <>
      <Header />
      <div className="bg-[#f7f9fa] dark:bg-transparent h-screen grid place-items-center">
        <div className="w-[50%] text-center max-[950px]:w-[80%] max-[550px]:mt-24">
          <h2 className="section-title">
            <p className="text-gradient font-bold !text-5xl">Online courses</p>
            <p className="text-3xl mt-3">To achieve your goals</p>
          </h2>

          <p className="mb-4 text-xl text-tertiary dark:text-white">
            Looking to add new skills? Is there a hobby you’ve wanted to try?
            We’re E-Learning, a leading destination for learning and teaching
            online.
          </p>

          <p className="text-xl text-tertiary dark:text-white max-[500px]:hidden">
            If you’re new to online learning and not sure where to start, you’re
            not alone. We’ve curated a free collection of courses for
            professionals. Take one of these courses and learn new skills (on
            us).
          </p>

          <BtnWithIcon
            content="Choose Your Courses"
            to="/courses"
            customClasses="block !w-fit mx-auto !mt-6"
          />
        </div>
      </div>

      <div className="container my-12 space-y-12">
        <div className="introduce-section">
          <div className="flex flex-col justify-center">
            <h2>Skills that suit you</h2>
            <p>
              Learn valuable, practical skills from free online video courses.
              Explore tech essentials and keep pace with change. Become more
              focused and productive. Top it off with courses that round out
              your skills and enrich your day to day.
            </p>
            <BtnWithIcon
              content="Learn More"
              to="/courses"
              customClasses="block mt-4"
            />
          </div>

          <div className="introduce-section-img">
            <NextImage
              src="/assets/images/about-page/learning-for-you.jpg"
              alt="Learning for you"
            />
          </div>
        </div>

        <div className="introduce-section introduce-reverse">
          <div className="introduce-section-img left">
            <NextImage
              src="/assets/images/about-page/leading-teams.jpg"
              alt="Leading Team"
            />
          </div>

          <div className="right flex flex-col justify-center">
            <h2>Build the skills of the future, today</h2>
            <p>
              Get free resources from industry leaders to guide your
              organization toward its goals. Learn strategies to adapt, continue
              growing, and support your employees.
            </p>
            <BtnWithIcon
              content="Learn More"
              to="/courses"
              customClasses="block mt-4"
            />
          </div>
        </div>
        <div className="introduce-section">
          <div className="flex flex-col justify-center">
            <h2>Share your knowledge</h2>
            <p>
              Real-world experts like you make a global impact by teaching on
              E-Learning. We believe everyone has something to offer. Share your
              unique skills and experiences with students around the world by
              teaching a free or paid course.
            </p>
            <BtnWithIcon
              content="Learn More"
              to="/courses"
              customClasses="block mt-4"
            />
          </div>

          <div className="introduce-section-img">
            <NextImage
              src="/assets/images/about-page/helping-through-teaching.jpg"
              alt="Helping through teaching"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
