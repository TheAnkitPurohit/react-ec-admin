import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { Box, Card, Avatar, Typography, CardContent } from '@mui/material';

import useProfile from 'src/hooks/use-profile';

import { BACKEND_URL } from 'src/utils/environments';

import profileService from 'src/services/profileService';

import MainHeading from 'src/components/typography/MainHeading';

import ProfileEditForm from './ProfileEditForm';

const ProfileColumn = ({ title, value }: { title: string; value: string }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <Typography variant="h5" color="text.secondary">
      {title} :
    </Typography>
    <Typography sx={{ fontSize: 14 }}>{value ?? '---'}</Typography>
  </Box>
);

const ProfilePage = () => {
  const { profile, handleSetProfile } = useProfile();

  const { data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.me,
  });

  if (isSuccess && data) {
    handleSetProfile(data);
  }

  const [isEdit, setIsEdit] = useState(false);

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

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
        <MainHeading heading={isEdit ? 'Edit Profile' : 'Profile'} />
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
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
              width: 40,
              height: 40,
              borderRadius: 1,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
            onClick={handleToggleEdit}
          >
            {isEdit ? <CloseIcon /> : <CreateIcon />}
          </Box>
          {isEdit ? (
            <ProfileEditForm profile={profile} handleToggleEdit={handleToggleEdit} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  alt={profile?.name ?? profile?.email}
                  src={profile?.avatar ? `${BACKEND_URL}/${profile.avatar}` : undefined}
                  sx={{ width: 160, height: 160 }}
                >
                  {String(profile?.name ?? profile?.email)
                    .charAt(0)
                    .toLocaleUpperCase()}
                </Avatar>
              </Box>
              <ProfileColumn title="Name" value={profile?.name} />
              <ProfileColumn title="Email" value={profile?.email} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
