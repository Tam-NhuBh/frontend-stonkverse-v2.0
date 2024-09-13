"use client";

import { FC, useState } from "react";
import { IFetchedPost } from "./posts";
import { mockComments } from "../../data/post-items";
import Advertisement from "./post-advertisement";
import { FaInstagram } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import NoContentYet from "../no-content-yet";
import { IReview } from "@/types";

interface Props {
  postDetail: IFetchedPost;
  postId: string;
}

const PostContentInner: FC<Props> = ({ postDetail, postId }): JSX.Element => {
  const formattedComments = mockComments.reverse();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(commentId);
  };

  const handleReplySubmit = (commentId: string) => {
    console.log(`Reply to comment ${commentId}: ${replyText}`);
    setReplyText("");
    setReplyingTo(null);
  };
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col">
            <div className="w-full py-3 mb-3">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <span className="inline-block h-8 w-1 mt-1 bg-gradient-to-b from-red-700 to-red-400"></span>
                {postDetail.title}
              </h2>
            </div>
            <div className="leading-relaxed pb-4">
              <p className="mb-5">{postDetail.content}</p>
              <figure className="text-center mb-6">
                <div className="resize overflow-auto max-w-full inline-block">
                  <img
                    className="mx-auto max-w-full h-auto"
                    src={postDetail.thumbnail.url}
                    alt={postDetail.title}
                  />
                </div>
                <figcaption>{postDetail.thumbnail.url || "No description available"}</figcaption>
              </figure>
              <blockquote className="relative p-4 border-l-4 border-red-700 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 mb-4 text-xl">
                <span className="absolute opacity-80 w-8 h-8 text-red-700">
                  <BiSolidQuoteAltLeft size={32} />
                </span>
                <p className="ml-16 mb-4">
                  {postDetail.content || "No quote available."}
                </p>
                <footer className="ml-16 text-base">
                  Quote by <cite title="Source Title">{postDetail.authors[0]?.name || "Unknown author"}</cite>
                </footer>
              </blockquote>

              <div className="relative flex flex-row items-center justify-between overflow-hidden bg-gray-100 dark:bg-gray-900 dark:bg-gray-700 mt-12 mb-2 px-6 py-2">
                <div className="my-4 text-sm">
                  <span className="mr-2 md:mr-4">
                    by <a className="font-semibold" href="#">{postDetail.authors[0]?.name}</a>
                  </span>

                  <time className="mr-2 md:mr-4" dateTime={new Date(postDetail.authors[0]?.date).toISOString()}>
                    <svg className="bi bi-calendar mr-2 inline-block" width="1rem" height="1rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                    {new Date(postDetail.authors[0]?.date).toLocaleDateString()}
                  </time>

                  <span className="mr-2 md:mr-4">
                    <svg className="bi bi-eye mr-2 inline-block" width="1rem" height="1rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                    {postDetail.views.toLocaleString()}x views
                  </span>
                </div>

                <div className="lg:block">
                  <li className="inline-block">
                    <a target="_blank" rel="noopener noreferrer" className="hover:text-red-700" href={postDetail.socialLinks.instagram} title="Share to Instagram">
                      <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                    </a>
                  </li>
                </div>
              </div>
              <div>
                {formattedComments.length ? (
                  <div className="space-y-6">
                    {formattedComments.map((comment) => (
                      <div key={comment._id} className="p-4 rounded-md ">
                        <div className="flex items-center mb-2">
                          <img src={comment.user.avatar.url} alt={comment.user.name} className="w-12 h-12 rounded-full mr-3" />
                          <div>
                            <span className="font-semibold">{comment.user.name}</span>
                            <p className="text-gray-600 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="mb-2">{comment.comment}</p>
                        <div className="text-yellow-500 mb-2">{'⭐'.repeat(comment.rating)}</div>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleReplyClick(comment._id)}
                        >
                          Reply
                        </button>

                        {replyingTo === comment._id && (
                          <div className="mt-4">
                            <textarea
                              className="w-full p-2 border rounded-md"
                              placeholder="Write your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <button
                              className="mt-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                              onClick={() => handleReplySubmit(comment._id)}
                            >
                              Submit Reply
                            </button>
                          </div>
                        )}

                        {comment.replies.length > 0 && (
                          <div className="mt-4 space-y-4 ml-4 border-l-2 pl-4">
                            {comment.replies.map((reply) => (
                              <div key={reply._id} className="flex items-start mb-2">
                                <img src={reply.user.avatar.url} alt={reply.user.name} className="w-8 h-8 rounded-full mr-2" />
                                <div>
                                  <span className="font-semibold">{reply.user.name}</span>
                                  <p className="text-gray-600 text-sm">{new Date(reply.createdAt).toLocaleDateString()}</p>
                                  <p>{reply.comment}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <NoContentYet description="There aren't any comments for this post yet" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <Advertisement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContentInner;
