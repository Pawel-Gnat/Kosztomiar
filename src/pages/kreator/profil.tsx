import { ProfileImage } from '@/assets/svg/ProfileImage';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { ChangePasswordForm } from '@/components/pages/profilpage/ChangePasswordForm/ChangePasswordForm';
import { ProfilpageContainer } from '@/components/pages/profilpage/ProfilpageContainer/ProfilpageContainer';
import { Button } from '@/components/ui/Button/Button';
import { Text } from '@/components/ui/Text/Text';
import { LoadingProvider } from '@/store/loading-context';
import { GetServerSidePropsContext } from 'next';
import { signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';

export default function ProfilPage() {
  const logoutHandler = () => {
    signOut();
  };

  return (
    <DashboardLayout>
      <ProfilpageContainer>
        <ProfileImage />
        <Text content="Ustawienia profilu użytkownika" />
        <LoadingProvider>
          <ChangePasswordForm />
        </LoadingProvider>
        <Button
          type="button"
          isSmall={false}
          accent={false}
          content="Wyloguj się"
          onClick={logoutHandler}
        />
      </ProfilpageContainer>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
