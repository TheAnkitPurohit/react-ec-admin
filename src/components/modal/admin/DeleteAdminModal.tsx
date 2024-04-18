import 'dayjs/locale/en';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import adminService from 'src/services/adminService';

import FormSubmitBtn from 'src/components/buttons/SubmitButton';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  selectedAdmin: Admin | undefined;
};

export default function DeleteAdminModal({ open, onClose, selectedAdmin }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: adminService.delete,
    onSuccess: (response) => {
      console.log({ response });
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['managerlist'] });
      onClose();
    },
    onError(error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
    },
  });

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
      <DialogTitle>Delete Admin</DialogTitle>
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
          Are you sure you want to delete this admin?
        </Box>
      </DialogContent>

      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 1 }}>
          <FormSubmitBtn
            name="Cancel"
            handleClick={onClose}
            BtnType="button"
            BackGroundColor="#A3A3A3"
          />

          <FormSubmitBtn
            BackGroundColor="#4299e1"
            isSubmitting={isPending}
            name="Confirm"
            handleClick={() => {
              if (selectedAdmin?.email) {
                mutate(selectedAdmin?.email);
              }
            }}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}
