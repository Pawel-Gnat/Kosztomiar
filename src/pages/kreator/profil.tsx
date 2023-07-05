import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import { Button } from '@/components/ui/Button/Button';
import { GetServerSidePropsContext } from 'next';
import { signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';

export default function ProfilPage() {
  const logoutHandler = () => {
    signOut();
  };

  return (
    <DashboardLayout>
      <Button
        type="button"
        isSmall={false}
        accent={false}
        content="Wyloguj się"
        onClick={logoutHandler}
      />
    </DashboardLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
