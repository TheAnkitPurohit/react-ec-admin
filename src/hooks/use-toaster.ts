import { useSnackbar } from 'notistack';

const useToaster = () => {
  const { enqueueSnackbar } = useSnackbar();

  const successToast = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      autoHideDuration: 2000,
    });
  };

  const errorToast = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      autoHideDuration: 2000,
    });
  };

  return { successToast, errorToast };
};

export default useToaster;
