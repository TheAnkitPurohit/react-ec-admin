import 'dayjs/locale/en';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import useToaster from 'src/hooks/use-toaster';

import categoryService from 'src/services/categoryService';
import { createCategorySchema } from 'src/validations/category';

import RHFSwitch from 'src/components/hook-form/rhf-switch';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import ModalFooter from '../ModalFooter';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentCagory: Category | undefined;
};

export default function AddCategoryModal({ open, onClose, currentCagory }: Props) {
  const isCreate = !currentCagory?._id;
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useToaster();

  const { mutate, isPending } = useMutation({
    mutationFn: categoryService.create,
    onSuccess: (response) => {
      successToast(response?.message);
      queryClient.invalidateQueries({ queryKey: ['categorylist'] });
      handleClose();
    },
    onError(error) {
      errorToast(error?.message);
    },
  });

  const defaultValues: Category = {
    name: currentCagory?.name ?? '',
    order: currentCagory?.order ?? '',
    enabled: currentCagory?.enabled ?? false,
  };

  console.log({ defaultValues });

  const methods = useForm<Category>({
    resolver: zodResolver(createCategorySchema()),
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
    formState: { isDirty },
  } = methods;

  const onSubmit = handleSubmit(async () => {
    const values = getValues();
    console.log({ values });

    if (!isCreate) {
      //
    } else {
      mutate(values);
    }
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
        <DialogTitle>{isCreate ? 'Create Cateogry' : 'Update Category'}</DialogTitle>
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
            <RHFTextField
              name="name"
              label="Name"
              defaultValue={defaultValues?.name}
              value={defaultValues?.name}
            />
            <RHFTextField
              name="order"
              label="Order"
              type="number"
              defaultValue={defaultValues?.order}
            />

            <RHFSwitch
              name="enabled"
              labelPlacement="start"
              label={
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Status
                </Typography>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              defaultChecked={defaultValues?.enabled}
            />
          </Box>
        </DialogContent>

        <ModalFooter
          handleClose={handleClose}
          isSubmitting={isPending}
          isDisabled={!isDirty}
          submitButtonText={isCreate ? 'Create' : 'Update'}
        />
      </FormProvider>
    </Dialog>
  );
}
