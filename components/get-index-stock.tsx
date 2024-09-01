"use client"

import { getIndexStock } from "@/lib/fetch-data";
import { CircularProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

interface Props { }

const GetIndexStock: FC<Props>= (): JSX.Element => {
    const [stockInfo, setStockInfo] = useState<{ symbol: string; close_price: number; change_percent: string } | null>(null);
    useEffect(() => {
        const fetchStockInfo = async () => {
            try {
                const data = await getIndexStock();
                setStockInfo(data);
            } catch (error) {
                console.error("Failed to fetch stock info:", error);
            }
        };

        fetchStockInfo();
    }, []);

    return (
        <div className="border-t dark:border-slate-700 py-1 fixed bottom-0 left-0 right-0 bg-white dark:bg-opacity-50 dark-bg ">
            <div className="container text-[#999999] text-xs flex items-center justify-between">
                <span className=" my-2 text-center">
                    <div className="stock-info">
                        {stockInfo ? (
                            <div className="flex items-center text-black dark:text-white">
                                <IoMdTrendingUp />
                                <span className="flex justify-center font-bold mx-2">{stockInfo.symbol}</span>
                                <span className="flex justify-center mx-1 glow">{stockInfo.close_price}</span>
                                <span className="flex justify-center mx-1 glow">{stockInfo.change_percent}%</span>
                                {parseFloat(stockInfo.change_percent) >= 0 ? (
                                    <FaArrowUp className="text-green-500" />
                                ) : (
                                    <FaArrowDown className="text-red-500" />
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center dark:invert space-x-1.5">
                            <div className='dot animate-bounce delay-0'></div>
                            <div className='dot animate-bounce delay-150'></div>
                            <div className='dot animate-bounce delay-300'></div>
                        </div>
                        )}
                    </div>
                </span>

            </div>
        </div>
    )
};
export default GetIndexStock;