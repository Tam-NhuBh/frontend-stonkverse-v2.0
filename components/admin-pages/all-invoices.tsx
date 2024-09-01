"use client";

import { FC, useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { useGetAllOrdersQuery } from "@/store/order/order-api";
import { useGetAllUsersQuery } from "@/store/user/user-api";
import { useGetAllCoursesQuery } from "@/store/course/course-api";
import { AiOutlineMail } from "react-icons/ai";
import LoadingSpinner from "../loading-spinner";
import { Box } from "@mui/material";

interface Props {
  isDashboard?: boolean;
}

const AllInvoices: FC<Props> = ({ isDashboard }): JSX.Element => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [ordersData, setOrdersData] = useState<any>([]);

  const { data: fetchedOrders, isLoading: ordersLoading } =
    useGetAllOrdersQuery({});
  useEffect(() => {
    if (fetchedOrders) {
      let temp: any[] = fetchedOrders.orders.map((item: any) => {

        if (!item || !item.userId || !item.courseId) return null;

        const user = usersData?.users?.find(
          (user: any) => user._id === item.userId
        );
          
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );

        if (!course) return null;

        const price = course?.price ? "$" + course?.price : "No course purchased"; // Kiểm tra và trả về giá trị hoặc chuỗi thích hợp

        return {
          id: item._id,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: price,
          created_at: item.createdAt,
        };
      });

      temp = temp.filter((item) => item != null)
      setOrdersData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-dark_text text-tertiary"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-0"}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box
          m={isDashboard ? "0" : "40px 0 0 0"}
          height={isDashboard ? "100%" : "90vh"}
          overflow="hidden"
          sx={{
            "& .MuiDataGrid-root": {
              fontFamily: "revert",
              border: "none",
              outline: "none",
            },
            "& .css-c5c7cs-MuiDataGrid-root": {
              justifyContent: "center !important",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "#fff" : "#1e293b",
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#1e293b",
              borderBottom:
                theme === "dark"
                  ? "1px solid #ffffff30!important"
                  : "1px solid #ccc !important",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#111C43" : "#475569",
              borderBottom: "none",
              color: "#fff",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
            },
            "& .MuiDataGrid-footerContainer": {
              color: "#fff",
              borderTop: "none",
              backgroundColor: theme === "dark" ? "#111C43" : "#475569",
            },
            "& .MuiTablePagination-selectLabel": {
              fontFamily: "revert",
            },
            "& .MuiDataGrid-columnHeaderTitleContainerContent .MuiCheckbox-root":
              { color: theme === "light" ? "#fff" : "" },
            "& .MuiCheckbox-root": {
              color: theme === "dark" ? "#fff" : "#475569",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#fff !important",
            },
            "& .MuiIconButton-root": {
              color: "#fff !important",
            },
          }}
        >
          <h5 className="text-lg uppercase font-semibold">
            Recent Transactions
          </h5>
          <DataGrid
            checkboxSelection={isDashboard ? false : true}
            rows={ordersData}
            columns={columns}
            components={isDashboard ? {} : { Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
