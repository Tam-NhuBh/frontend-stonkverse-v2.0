import LoadingSpinner from "@/components/loading-spinner";
import { useGetCoursesAnalyticsQuery } from "@/store/analytics/analytics-api";
import { FC, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";

interface Props {}

const minValue = 0;

const CoursesAnalytics: FC<Props> = (props): JSX.Element => {
  const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});
  const [renderedData, setRenderedData] = useState([]);

  useEffect(() => {
    if (data) {
      const formattedData = data.courses.map((item: any) => ({
        name: item.month,
        uv: Number(item.count),
      }));

      setRenderedData(formattedData);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen mt-8">
          <h1 className="text-center font-bold text-2xl mb-4">
            COURSES ANALYTICS
          </h1>
          <p className="text-center">(Last 12 months analytics data)</p>

          <div className="w-[90%] aspect-video mx-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="50%">
              <BarChart width={150} height={300} data={renderedData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesAnalytics;
