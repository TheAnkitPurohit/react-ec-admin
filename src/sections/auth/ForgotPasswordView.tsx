import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Link } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import authService from 'src/services/authService';
import { PATH_AFTER_REGISTER } from 'src/config-global';
import { forgotPasswordSchema, ForgotPasswordInterface } from 'src/validations/auth';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    email: '',
  };

  const methods = useForm<ForgotPasswordInterface>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate } = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      router.push(PATH_AFTER_REGISTER);
    },
    onError: (error: AxiosError | any) => {
      setErrorMsg(error?.response?.data?.message ?? error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate(data.email);
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4"> Forget Your Password</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <Link
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
        onClick={() => {
          router.push(PATH_AFTER_REGISTER);
        }}
      >
        try to Login?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Get Password Reset Link
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
