"use client";

import { FC } from "react";
import Link from "next/link";
import NextImage from "./next-image"; 
import BtnWithIcon from "./btn-with-icon";

interface IAuthor {
    avatar: string;
    name: string;
    date: Date;
}

interface INewsItem {
    title: string;
    content: string;
    url: string;
    authors: IAuthor[];
    thumbnail: { url: string };
}

interface Props {
    post: INewsItem;
}

const NewsCardItem: FC<Props> = ({ post }): JSX.Element => {
    return (
        <div className="rounded-[5px] shadow-md dark:border-none dark:bg-slate-500 bg-white dark:bg-opacity-20 custom-hover cursor-pointer">
            <Link href={post.url} className="relative block w-full aspect-[16/9] overflow-hidden">
                <NextImage
                    src={post.thumbnail.url}
                    alt={post.title}
                    className="rounded-t-[2px]"
                />
            </Link>

            <div className="p-4 dark:text-dark_text text-tertiary">
                <h3 className="font-semibold text-lg text-gradient line-clamp-2 mb-3">
                    <Link href={post.url}>{post.title}</Link>
                </h3>

                <p className="text-sm md:text-base line-clamp-3 mb-4">
                    {post.content}
                </p>
                {/* 
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-4">
                    {post.authors.map((author, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2 sm:mb-0">
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium">{author.name}</span>
                            <span className="ml-2 flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                <FaCalendarAlt className="-mt-[2px]" size={16} />
                                {new Date(author.date).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div> */}

                <div className="mt-auto">
                    <Link href={post.url}>
                        <BtnWithIcon
                            content="READ MORE"
                            iconSize={25}
                            customClasses="w-full mt-4"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsCardItem;


// news page list
//admin news management
//layout admin management
// change api fe