import 'dayjs/locale/en';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import ModalFooter from '../ModalFooter';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  title: string;
  isSubmitting: boolean;
  handleConfirm: VoidFunction;
};

export default function DeleteModal({ open, onClose, title, isSubmitting, handleConfirm }: Props) {
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 500, mt: -30 },
      }}
    >
      <DialogTitle>Delete {title}</DialogTitle>
      <DialogContent>
        <Box
          rowGap={3}
          columnGap={2}
          mt={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
          }}
        >
          Are you sure you want to delete this {title}?
        </Box>
      </DialogContent>

      <ModalFooter
        handleClose={onClose}
        isSubmitting={isSubmitting}
        submitButtonText="Confirm"
        handleClick={handleConfirm}
      />
    </Dialog>
  );
}
