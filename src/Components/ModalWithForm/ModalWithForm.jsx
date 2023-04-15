import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const ModalWithForm = ({ openModal, handleCloseModal }) => {
  return (
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '480px',
            bgcolor: 'background.paper',
            border: '2px solid',
            boxShadow: 24,
            p: 4,

          }}
        >
          <Typography variant="h6" sx={{ }}>
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
  );
};

export default ModalWithForm;