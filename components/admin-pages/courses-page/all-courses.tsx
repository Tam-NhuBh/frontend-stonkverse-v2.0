"use client";

import { formatShortDate } from "@/lib/format-data";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/store/course/course-api";
import { Box, Button, Modal } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import DataTable from "../data-table";
import BtnWithIcon from "@/components/btn-with-icon";
import BtnWithLoading from "@/components/btn-with-loading";
import toast from "react-hot-toast";
import Link from "next/link";

interface Props {}

const AllCourses: FC<Props> = (props): JSX.Element => {
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.5,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit
                size={17}
                className="dark:text-dark_text text-slate-700 mr-6"
              />
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setDeleteModal(true);
                setCurrentCourseId(params.row.id);
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
    rows = data.courses.map((item: any) => ({
      id: item._id,
      title: item.name,
      ratings: item.ratings,
      purchased: item.purchased,
      created_at: formatShortDate(item.createdAt),
    }));
  }

  const [
    deleteCourse,
    { isLoading: deleteCourseLoading, isSuccess, error: deleteCourseError },
  ] = useDeleteCourseMutation();

  const deleteCourseHandler = async () => {
    await deleteCourse(currentCourseId);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Delete course successfully!");
      setDeleteModal(false);
    }

    if (deleteCourseError) {
      if ("data" in deleteCourseError) {
        const errorData = deleteCourseError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, deleteCourseError]);

  return (
    <div className="mt-8 w-[90%] mx-auto">
      <DataTable rows={rows} columns={columns} isLoading={isLoading} />

      {deleteModal && (
        <Modal
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-content-wrapper">
            <h4 className="form-title">Are you sure to delete this course?</h4>
            <div className="mt-4 w-[70%] flex justify-between mx-auto pb-4">
              <BtnWithIcon
                content="Cancel"
                onClick={() => setDeleteModal(false)}
              />
              <BtnWithLoading
                content="Confirm"
                isLoading={deleteCourseLoading}
                customClasses="!bg-red-700 !w-fit"
                type="button"
                onClick={deleteCourseHandler}
              />
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllCourses;
