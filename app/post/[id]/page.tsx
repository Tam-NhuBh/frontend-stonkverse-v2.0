"use client" //[XEM LẠI: BỎ DÒNG NÀY ĐI FETCH DATA TỪ SERVER LÊN]
import Heading from "@/components/heading";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { getAllPostsData } from "@/lib/fetch-data";
import { FC, useState } from "react";
import { IFetchedPost } from "@/components/home-page/posts";
import { IPost } from "@/types";
import { postData } from "@/data/post-items";
import PostContentInner from "@/components/home-page/post-content-inner";

interface Props {
  params: {
    id: string;
  };
}

const Page: FC<Props> = async ({ params }): Promise<JSX.Element> => {
  // const posts = (await getAllPostsData()) as IFetchedPost[];
  const [posts] = useState<IPost[]>(postData);

  const postDetail = posts.find(post => post._id.toString() === params.id);

  if (!postDetail) {
    return (
      <>
        <Heading title="Post Detail" />
        <Header />
        <div className="container mx-auto">
          <h1>Post not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Heading title={`Post Detail`} />
      <Header />
      <PostContentInner postDetail={postDetail} postId={params.id} />
      <Footer />
    </>
  );
};

export default Page;
