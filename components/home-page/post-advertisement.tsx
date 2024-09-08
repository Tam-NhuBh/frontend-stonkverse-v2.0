import { advertisementImage, popularPosts } from "@/data/advertisement-item";
import { FC } from "react";

interface AdvertisementProps {}

const Advertisement: FC<AdvertisementProps> = () => {
    return (
        <div className="w-full dark:bg-slate-900 rounded-[5px] dark:border-none">
            <div className="mb-6">
                <div className="p-4 bg-gray-200 dark:bg-slate-800">
                    <h2 className="text-lg font-semibold">Most Popular</h2>
                </div>
                <ul className="post-number">
                    {popularPosts.map((post) => (
                        <li key={post.id} className="border-b border-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300">
                        <a className="text-lg font-semibold px-6 py-3 flex flex-row items-center" href={post.link}>
                                {post.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="text-sm py-6 sticky">
                <div className="w-full text-center">
                    <a className="uppercase" href="#">Advertisement</a>
                    <a href="#">
                        <img className="mx-auto" src={advertisementImage} alt="advertisement area" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;
