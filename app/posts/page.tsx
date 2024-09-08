import CourseCard from "@/components/course-card";
import Heading from "@/components/heading";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { getAllPostsData } from "@/lib/fetch-data";
import { FC } from "react";
import SearchBar from "@/components/home-page/search-bar";
import ChatBotClient from "@/components/layout/chatbot-client";
import PostCard from "@/components/post-card";
import Post from "@/components/home-page/posts";
// import Post, { IFetchedPost } from "@/components/home-page/posts";

interface Props { }

const page: FC<Props> = async (props): Promise<JSX.Element> => {
//   const posts = (await getAllPostsData()) as IFetchedPost[];

  return (
    <>
      <Heading
        title="All Courses"
      />
      <div className="min-h-screen">
        <Header />
        <div className="container mt-8 mb-14">
              {/* {posts?.map((item) => (
                <PostCard key={item._id.toString()} post={item} />
              ))} */}
              <Post/>
              <div className="chatbot-container">
                <ChatBotClient />
              </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default page;
