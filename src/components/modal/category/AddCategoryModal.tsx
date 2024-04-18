import 'dayjs/locale/en';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import categoryService from 'src/services/categoryService';
import { createCategorySchema } from 'src/validations/category';

import RHFSwitch from 'src/components/hook-form/rhf-switch';
import FormSubmitBtn from 'src/components/buttons/SubmitButton';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentCagory: Category | undefined;
};

export default function AddCategoryModal({ open, onClose, currentCagory }: Props) {
  const isCreate = !currentCagory?._id;
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isPending } = useMutation({
    mutationFn: categoryService.create,
    onSuccess: (response) => {
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['categorylist'] });
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

  const defaultValues: Category = {
    name: currentCagory?.name ?? '',
    order: currentCagory?.order ?? '',
    enabled: currentCagory?.enabled ?? false,
  };

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
    formState: { isSubmitting, isDirty },
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

  const values = getValues();

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
            <RHFTextField name="name" label="Name" />
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
              name={isCreate ? 'Create' : 'Update'}
              isDisabled={!isDirty}
            />
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
