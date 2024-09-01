import { Box } from "@mui/material";
import { FC } from "react";
import LoadingSpinner from "../loading-spinner";
import { useTheme } from "next-themes";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  rows: [];
  columns: GridColDef[];
  isLoading: boolean;
}

const DataTable: FC<Props> = ({ isLoading, rows, columns }): JSX.Element => {
  const { theme } = useTheme();
  return (
    <div className="w-full z-0">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box marginTop="20px">
          <Box
            sx={{ height: "500px", overflowY: "auto",
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
                backgroundColor: theme === "dark" ? "#3e4396" : "#475569",
                borderBottom: "none",
                color: "#fff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "#fff",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#475569",
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
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default DataTable;
