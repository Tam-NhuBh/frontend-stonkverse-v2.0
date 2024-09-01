"use client";

import { FC, useState } from "react";
import { newsItemsData } from "@/data/news-items";
import NewsCardItem from "@/components/news-card";
import Advertisement from "./news-advertisement";
import TradingMap from "./trading-map";

interface Props { }

const NewsList: FC<Props> = (): JSX.Element => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(newsItemsData.length / itemsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentItems = newsItemsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container flex flex-wrap gap-8">
            <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="flex-1 min-w-[0] flex flex-col">
                    <div className="w-full mb-5 flex-1">
                        <div className="w-full py-2">
                            <h2 className="dark:text-white text-lg font-semibold">
                                Trading Map
                            </h2>
                        </div>
                        <div className="flex-1">
                            <TradingMap />
                        </div>
                    </div>

                    {/* NewsCardItem */}
                    <div className="flex-1">
                        <div className="w-full py-3">
                            <h2 className="dark:text-white text-lg font-semibold">
                                News Feed
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {currentItems.map((news) => (
                                <NewsCardItem key={news.title} post={news} />
                            ))}
                        </div>
                        <div className="flex gap-2 mt-4 justify-center">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleClick(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black"
                                        } rounded`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/*Advertisement */}
                <div className="w-full md:w-1/3 flex flex-col">
                    <Advertisement />
                </div>
            </div>
        </div>
    );
};

export default NewsList;
