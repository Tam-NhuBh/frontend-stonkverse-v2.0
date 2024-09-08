"use client";

import { FC } from "react";
import { IFetchedPost } from "./posts";
import Advertisement from "./post-advertisement";

interface Props {
  postDetail: IFetchedPost;
  postId: string;
}

const PostContentInner: FC<Props> = ({ postDetail, postId }): JSX.Element => {
  if (!postDetail) {
    return (
      <div className="bg-gray-50 py-6">
        <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
          <h2 className="text-gray-800 text-3xl font-bold">
            Post not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-slate-900 rounded-[5px] dark:border-none py-6">
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">
          <div className="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
            <div className="w-full py-3 mb-3">
              <h2 className="text-3xl font-bold">
                <span className="inline-block h-5 border-l-3 border-red-700 mr-2"></span>
                {postDetail.title}
              </h2>
            </div>
            <div className="flex flex-row flex-wrap -mx-3">
              <div className="max-w-full w-full px-4">
                <div className="leading-relaxed pb-4">
                  <p className="mb-5">{postDetail.content}</p>
                  <figure className="text-center mb-6">
                    <img
                      className="mx-auto max-w-full h-auto"
                      src={postDetail.thumbnail.url}
                      alt={postDetail.title}
                    />
                    <figcaption>{postDetail.thumbnail.url || "No description available"}</figcaption>
                  </figure>

                  <blockquote className="relative p-4 border-l-4 border-red-700 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 mb-4 text-xl">
                    <p className="ml-16 mb-4">
                      {postDetail.content || "No quote available."}
                    </p>
                    <footer className="ml-16 text-base">
                      Quote by <cite title="Source Title">{postDetail.authors[0]?.name || "Unknown author"}</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Advertisement */}
          <div className="w-full md:w-1/3 flex flex-col">
            <Advertisement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContentInner;
