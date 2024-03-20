import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  return <Container>{children}</Container>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  // const check = useCallback(() => {
  //   if (authenticated) {
  //     router.replace(returnTo);
  //   }
  // }, [authenticated, returnTo, router]);

  // useEffect(() => {
  //   check();
  // }, [check]);

  return <>{children}</>;
}
