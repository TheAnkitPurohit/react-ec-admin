import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Box, Avatar } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { BACKEND_URL } from 'src/utils/environments';

import profileService from 'src/services/profileService';
import { editProfileSchema } from 'src/validations/auth';
import { ProfileState } from 'src/store/slices/profileSlice';

import { RHFTextField } from 'src/components/hook-form';
import FormSubmitBtn from 'src/components/buttons/SubmitButton';
import FormProvider from 'src/components/hook-form/form-provider';
import UploadImageModal from 'src/components/uploadImage/UploadImageModal';

interface ProfileEditProps {
  profile: ProfileState;
  handleToggleEdit(): void;
}

const ProfileEditForm = ({ profile, handleToggleEdit }: ProfileEditProps) => {
  const profileEdit = useBoolean();

  const [imageUrl, setImageUrl] = useState<any | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isPending } = useMutation({
    mutationFn: profileService.update,
    onSuccess: (response) => {
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      handleToggleEdit();
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

  interface ProfileForm {
    name: string;
    avatar: string;
  }

  const defaultValues: ProfileForm = {
    name: profile?.name ?? '',
    avatar: '',
  };

  const methods = useForm<ProfileForm>({
    resolver: zodResolver(editProfileSchema()),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty },
  } = methods;

  const setImage = (imageFile: any) => {
    setValue('avatar', imageFile);
  };

  // submit handler
  const onSubmit = handleSubmit(async () => {
    const values = getValues();
    mutate(values);
  });

  return (
    <>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={profileEdit?.onTrue}
          >
            <Avatar
              src={imageUrl || (profile?.avatar ? `${BACKEND_URL}/${profile.avatar}` : undefined)}
              sx={{ width: 160, height: 160 }}
            />
          </Box>
          <RHFTextField name="name" label="Name" />

          <FormSubmitBtn isSubmitting={isPending} name="Save" isDisabled={!isDirty} />
        </Box>
      </FormProvider>
      <UploadImageModal
        isOpen={profileEdit?.value}
        onClose={profileEdit?.onFalse}
        setImage={setImage}
        setImageUrl={setImageUrl}
        isRound
      />
    </>
  );
};

export default ProfileEditForm;
