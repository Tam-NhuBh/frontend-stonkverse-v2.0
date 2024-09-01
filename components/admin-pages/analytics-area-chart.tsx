import { FC } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  isDashboard?: boolean;
  data: any;
  title: string;
}

const AnalyticsAreaChart: FC<Props> = ({
  isDashboard,
  data,
  title,
}): JSX.Element => {
  return (
    <div
      className={`${
        isDashboard
          ? "shadow-md border dark:border-none rounded-sm dark:bg-[#111C43] pb-5"
          : "mt-[50px]"
      }`}
    >
      <h1
        className={`text-center font-bold text-2xl mb-4 ${
          isDashboard && "py-4 text-lg font-semibold"
        }`}
      >
        {title}
      </h1>
      {!isDashboard && (
        <p className="text-center">(Last 12 months analytics data)</p>
      )}

      <div
        className={`w-full ${
          isDashboard ? "aspect-[3]" : "h-screen"
        } flex items-center justify-center`}
      >
        <ResponsiveContainer
          width={isDashboard ? "100%" : "90%"}
          height={!isDashboard ? "50%" : "100%"}
        >
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Count"
              stroke="#4d62d9"
              fill="#4d62d9"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsAreaChart;
