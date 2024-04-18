import 'dayjs/locale/en';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { createAdminSchema } from 'src/schemas/admin';
import adminService, { CreateAdminInterface } from 'src/services/adminService';

import FormSubmitBtn from 'src/components/buttons/SubmitButton';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function CreateAdminModal({ open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: adminService.create,
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
      handleClose();
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

  const defaultValues: CreateAdminInterface = {
    email: '',
    name: '',
  };

  const methods = useForm<CreateAdminInterface>({
    resolver: zodResolver(createAdminSchema()),
    defaultValues,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (result: CreateAdminInterface) => {
    mutate(result);
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { maxWidth: 500, mt: -30 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Create Admin</DialogTitle>
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
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="email" label="Email" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 1 }}>
            <FormSubmitBtn
              name="Cancel"
              handleClick={handleClose}
              BtnType="button"
              BackGroundColor="#A3A3A3"
            />

            <FormSubmitBtn
              BackGroundColor="#4299e1"
              isSubmitting={isSubmitting}
              name="Create"
              isDisabled={!isDirty}
            />
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
