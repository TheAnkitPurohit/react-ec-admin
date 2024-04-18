import React from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import IconButton from '@mui/material/IconButton';
import { Box, Card, CardContent } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import profileService from 'src/services/profileService';
import { ChangePasswordSchema } from 'src/validations/auth';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import MainHeading from 'src/components/typography/MainHeading';
import FormSubmitBtn from 'src/components/buttons/SubmitButton';
import FormProvider from 'src/components/hook-form/form-provider';

const ChangePasswordPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isPending } = useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: (response) => {
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
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

  interface ChangePasswordInterface {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const oldPasswordState = useBoolean();
  const newPasswordState = useBoolean();
  const confirmPassword = useBoolean();

  const defaultValues: ChangePasswordInterface = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm<ChangePasswordInterface>({
    resolver: zodResolver(ChangePasswordSchema()),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = methods;

  // submit handler
  const onSubmit = handleSubmit(async () => {
    const values = getValues();

    const { oldPassword, newPassword } = values;

    mutate({
      currentPassword: oldPassword,
      newPassword,
    });
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box>
        <MainHeading heading="Change Password" />
      </Box>

      <Card
        sx={{
          width: 400,
          height: 400,
        }}
      >
        <CardContent
          sx={{
            position: 'relative',
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <RHFTextField
                name="oldPassword"
                label="Old Password"
                type={oldPasswordState.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={oldPasswordState.onToggle} edge="end">
                        <Iconify
                          icon={oldPasswordState.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                name="newPassword"
                label="New Password"
                type={newPasswordState.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={newPasswordState.onToggle} edge="end">
                        <Iconify
                          icon={newPasswordState.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                name="confirmPassword"
                label="Confirm Password"
                type={confirmPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={confirmPassword.onToggle} edge="end">
                        <Iconify
                          icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormSubmitBtn isSubmitting={isPending} name="Save" isDisabled={!isDirty} />
            </Box>
          </FormProvider>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePasswordPage;
