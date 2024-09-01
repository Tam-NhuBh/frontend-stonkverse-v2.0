import { Modal, Box } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  Component: FC<any>;
  setRoute?: Dispatch<SetStateAction<string>>;
  refetch?: any;
}

const CustomModal: FC<Props> = ({
  openModal,
  setOpenModal,
  Component,
  setRoute,
  refetch,
}): JSX.Element => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-content-wrapper">
        <Component
          setOpenModal={setOpenModal}
          setRoute={setRoute}
          refetch={refetch}
        />
      </Box>
    </Modal>
  );
};

export default CustomModal;
