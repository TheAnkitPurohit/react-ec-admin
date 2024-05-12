import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import useAuth from 'src/hooks/use-auth';
import { useBoolean } from 'src/hooks/use-boolean';

import { APP_EMAIL, APP_PASSWORD } from 'src/utils/environments';

import authService from 'src/services/authService';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { loginSchema, LoginInterface } from 'src/validations/auth';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const router = useRouter();
  const { handleAddCredentails } = useAuth();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const defaultValues = {
    email: APP_EMAIL ?? '',
    password: APP_PASSWORD ?? '',
  };

  const methods = useForm<LoginInterface>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const access_token = data?.data?.accessToken;
      const refresh_token = data?.data?.refreshToken;
      const auth = { token: access_token, refresh_token };

      handleAddCredentails(auth);
      router.push(returnTo || PATH_AFTER_LOGIN);
    },
    onError: (error: AxiosError | any) => {
      setErrorMsg(error?.response?.data?.message ?? error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate(data);
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Admin Dashboard</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
        onClick={() => {
          router.push('/forgot-password');
        }}
      >
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
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
