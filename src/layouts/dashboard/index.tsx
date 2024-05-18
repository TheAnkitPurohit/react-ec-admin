import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/use-auth';
import useProfile from 'src/hooks/use-profile';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { PATH_AFTER_REGISTER } from 'src/config-global';
import profileService from 'src/services/profileService';

import { useSettingsContext } from 'src/components/settings';

import Main from './main';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const settings = useSettingsContext();
  const router = useRouter();
  const { handleResetAuth, token } = useAuth();
  const { handleSetProfile } = useProfile();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const [isLoading, setIsLoading] = useState(false);

  const getProfileData = async () => {
    setIsLoading(true);
    try {
      const data = await profileService.me();
      handleSetProfile(data);
    } catch (error) {
      handleResetAuth();
      router.push(PATH_AFTER_REGISTER);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      handleResetAuth();
      router.push(PATH_AFTER_REGISTER);
      return;
    }
    getProfileData();
  }, []);

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini />;

  const renderHorizontal = <NavHorizontal />;

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  );
}
