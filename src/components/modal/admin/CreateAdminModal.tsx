import 'dayjs/locale/en';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import useToaster from 'src/hooks/use-toaster';

import { createAdminSchema } from 'src/validations/admin';
import adminService, { CreateAdminInterface } from 'src/services/adminService';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import ModalFooter from '../ModalFooter';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function CreateAdminModal({ open, onClose }: Props) {
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useToaster();

  const { mutate, isPending } = useMutation({
    mutationFn: adminService.create,
    onSuccess: (response) => {
      successToast(response?.message);
      queryClient.invalidateQueries({ queryKey: ['managerlist'] });
      handleClose();
    },
    onError(error) {
      errorToast(error?.message);
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
    formState: { isDirty },
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

        <ModalFooter handleClose={handleClose} isSubmitting={isPending} isDisabled={!isDirty} />
      </FormProvider>
    </Dialog>
  );
}
