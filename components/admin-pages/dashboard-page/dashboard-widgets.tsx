import { FC, useEffect, useState } from "react";
import UserAnalytics from "../users-analytics-page/users-analytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import OrdersAnalytics from "../orders-analytics-page/orders-analytics";
import AllInvoices from "../all-invoices";
import {
  useGetOrderssAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/store/analytics/analytics-api";

interface Props {
  open?: boolean;
  value?: number;
}

// const CircularProgressWithLabel: FC<Props> = ({ open, value }): JSX.Element => {
//   return (
//     <Box sx={{ position: "relative", display: "inline-flex" }}>
//       <CircularProgress
//         variant="determinate"
//         value={value}
//         size={45}
//         color={value && value > 90 ? "info" : "error"}
//         thickness={4}
//         style={{ zIndex: open ? -1 : 1 }}
//       />
//       <Box
//         sx={{
//           inset: 0,
//           position: "absolute",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       ></Box>
//     </Box>
//   );
// };

const DashboardWidgets: FC<Props> = ({ open }): JSX.Element => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [usersComparePercentage, setUsersComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrderssAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users?.slice(-2);
        const ordersLastTwoMonths = ordersData.orders?.slice(-2);

        console.log(ordersLastTwoMonths);

        if (
          usersLastTwoMonths?.length === 2 &&
          ordersLastTwoMonths?.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setUsersComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentageChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentageChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="w-[90%] mx-auto mt-8 mb-12">
      <div className="grid grid-cols-[50%,50%] gap-4 mb-4">
        <UserAnalytics isDashboard />

        {/* <div>
          <div className="dark:bg-[#111C43] rounded-sm shadow-md border dark:border-none">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-tertiary text-[30px]" />
                <h5 className="pt-2 dark:text-dark_text text-tertiary text-lg">
                  {ordersComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 dark:text-[#45CBA0] text-tertiary">
                  Sales Obtained
                </h5>
              </div>

              <div className="">
                <CircularProgressWithLabel open={open} value={100} />
                <h5 className="text-center pt-4">
                  {ordersComparePercentage?.percentageChange > 0
                    ? "+" + ordersComparePercentage?.percentageChange.toFixed(2)
                    : "-" +
                      ordersComparePercentage?.percentageChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="dark:bg-[#111C43] shadow-md border dark:border-none mt-7">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-tertiary text-[30px]" />
                <h5 className="pt-2 dark:text-[#45CBA0] text-tertiary">
                  {usersComparePercentage?.currentMonth}
                </h5>
              </div>

              <div className="">
                <CircularProgressWithLabel open={open} value={100} />
                <h5 className="text-center pt-4">
                  {usersComparePercentage?.percentageChange > 0
                    ? "+" + usersComparePercentage?.percentageChange.toFixed(2)
                    : "-" + usersComparePercentage?.percentageChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div> */}
        <OrdersAnalytics isDashboard />
      </div>
      <AllInvoices isDashboard />

    </div>
  );
};

export default DashboardWidgets;
