"use client";

import LoadingSpinner from "@/components/loading-spinner";
import { useGetOrderssAnalyticsQuery } from "@/store/analytics/analytics-api";
import { FC, useEffect, useState } from "react";
import AnalyticsAreaChart from "../analytics-area-chart";

interface Props {
  isDashboard?: boolean;
}

const OrdersAnalytics: FC<Props> = ({ isDashboard }): JSX.Element => {
  const { data, isLoading } = useGetOrderssAnalyticsQuery({});

  const [renderedData, setRenderedData] = useState([]);

  useEffect(() => {
    if (data) {
      const formattedData = data.orders.map((item: any) => ({
        name: item.month,
        Count: Number(item.count),
      }));

      setRenderedData(formattedData);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AnalyticsAreaChart
          data={renderedData}
          title="ORDERS ANALYTICS"
          isDashboard={isDashboard}
        />
      )}
    </>
  );
};

export default OrdersAnalytics;
