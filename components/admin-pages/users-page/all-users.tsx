"use client";

import { formatShortDate } from "@/lib/format-data";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/store/user/user-api";
import { Box, Button, Modal } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import DataTable from "../data-table";
import BtnWithIcon from "@/components/btn-with-icon";
import BtnWithLoading from "@/components/btn-with-loading";
import toast from "react-hot-toast";

interface Props {}

const AllUsers: FC<Props> = (props): JSX.Element => {
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteModal, setDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Joined At",
      flex: 0.5,
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.25,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`} className="text-center">
              <AiOutlineMail
                size={20}
                className="dark:text-dark_text text-slate-700"
              />
            </a>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.25,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setDeleteModal(!deleteModal);
                setCurrentId(params.row.id);
              }}
            >
              <AiOutlineDelete
                size={20}
                className="dark:text-dark_text text-slate-700 mr-4"
              />
            </Button>
          </>
        );
      },
    },
  ];

  let rows = [];

  if (data) {
    rows = data.users.map((item: any) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role[0].toUpperCase() + item.role.substring(1),
      courses: `${item.courses.length} ${
        item.courses.length > 1 ? "courses" : "course"
      }`,
      created_at: formatShortDate(item.createdAt),
    }));
  }

  const [
    deleteUser,
    { isLoading: deleteUserLoading, isSuccess, error: deleteUserError },
  ] = useDeleteUserMutation();

  const deleteUserHandler = async () => {
    await deleteUser(currentId);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setDeleteModal(false);
    }

    if (deleteUserError) {
      if ("data" in deleteUserError) {
        const errorData = deleteUserError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, deleteUserError]);

  return (
    <div className="mt-8 w-[90%] mx-auto ">
      <DataTable rows={rows} columns={columns} isLoading={isLoading} />;
      {deleteModal && (
        <Modal
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-content-wrapper">
            <h4 className="form-title">Are you sure to delete this user?</h4>
            <div className="mt-4 w-[70%] flex justify-between mx-auto pb-4">
              <BtnWithIcon
                content="Cancel"
                onClick={() => setDeleteModal(false)}
              />
              <BtnWithLoading
                content="Confirm"
                isLoading={deleteUserLoading}
                customClasses="!bg-red-700 !w-fit"
                type="button"
                onClick={deleteUserHandler}
              />
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllUsers;
