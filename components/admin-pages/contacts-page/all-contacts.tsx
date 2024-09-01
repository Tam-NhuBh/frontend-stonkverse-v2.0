"use client";

import { formatShortDate } from "@/lib/format-data";
import { Box, Button, Modal } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import DataTable from "../data-table";
import BtnWithIcon from "@/components/btn-with-icon";
import BtnWithLoading from "@/components/btn-with-loading";
import toast from "react-hot-toast";
import {useDeleteContactMutation, useGetAllContactsQuery} from "@/store/contacts/contact-api";

interface Props {}

const AllContacts: FC<Props> = (props): JSX.Element => {
  const { isLoading, data, refetch } = useGetAllContactsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentContactId, setCurrentContactId] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "email",
      headerName: "Contact Email",
      flex: 0.5,
    },
    {
      field: "problem",
      headerName: "Problem",
      flex: 0.5,
    },
    {
      field: "explain",
      headerName: "Explain ",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
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
                setCurrentContactId(params.row.id);
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
    rows = data.contacts.map((item: any) => ({
      id: item._id,
      email: item.email,
      problem: item.problem,
      explain: item.explain,
      created_at: formatShortDate(item.createdAt),
    }));
  }

  const [deleteContact,
    { isLoading: deleteContactLoading, isSuccess, error: deleteContactError },
  ] =  useDeleteContactMutation();

  const deleteContactHandler = async () => {
    await deleteContact(currentContactId);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Delete contact successfully!");
      setDeleteModal(false);
    }

    if (deleteContactError) {
      if ("data" in deleteContactError) {
        const errorData = deleteContactError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, deleteContactError]);

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
            <h4 className="form-title">Are you sure to delete this contact?</h4>
            <div className="mt-4 w-[70%] flex justify-between mx-auto pb-4">
              <BtnWithIcon
                content="Cancel"
                onClick={() => setDeleteModal(false)}
              />
              <BtnWithLoading
                content="Confirm"
                isLoading={deleteContactLoading}
                customClasses="!bg-red-700 !w-fit"
                type="button"
                onClick={deleteContactHandler}
              />
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllContacts;
