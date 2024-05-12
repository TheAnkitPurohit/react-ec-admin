import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useParams, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import authService from 'src/services/authService';
import { PATH_AFTER_REGISTER } from 'src/config-global';
import { setPasswordSchema, SetPasswordInterface } from 'src/validations/auth';

import Iconify from 'src/components/iconify';
import { LinearProgressLoader } from 'src/components/loader';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function SetPasswordView() {
  const router = useRouter();
  const { token } = useParams();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const {
    data: admin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: () => authService.verifyToken(String(token)),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<SetPasswordInterface>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate } = useMutation({
    mutationFn: authService.setPassword,
    onSuccess: (data) => {
      router.push(PATH_AFTER_REGISTER);
    },
    onError: (error: AxiosError | any) => {
      setErrorMsg(error?.response?.data?.message ?? error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate({ password: data.password, token: String(token) });
  });

  if (isError || !token) {
    router.push(PATH_AFTER_REGISTER);
  }

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4"> Welcome {admin?.name}!</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

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

      <RHFTextField
        name="confirmPassword"
        label="Confirm Password"
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

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Set Password
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {isLoading ? <LinearProgressLoader /> : renderForm}
    </FormProvider>
  );
}
