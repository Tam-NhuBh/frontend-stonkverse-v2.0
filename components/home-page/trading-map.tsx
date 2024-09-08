import { FC } from "react";

interface Props { }

const TradingMap: FC<Props> = (): JSX.Element => {
    return (
        <div className="dark:bg-slate-900 rounded-[5px] shadow-md dark:border-none">
            <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                <div className="flex flex-row flex-wrap">
                    <div className="flex-shrink max-w-full w-full">
                        <iframe
                            src="https://ifin.tvsi.com.vn/report-1"
                            title="Trading Map"
                            className="w-full h-[350px] border-none dark:bg-gray-800 rounded-[5px]"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradingMap;
