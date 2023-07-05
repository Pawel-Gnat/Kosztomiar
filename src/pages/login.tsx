import { LoginFormContainer } from '@/components/login/LoginFormContainer/LoginFormContainer';
import { LoginFormHeader } from '@/components/login/LoginFormHeader/LoginFormHeader';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export default function LoginPage() {
  return (
    <LoginPageContainer>
      <LoginFormHeader />
      <LoginFormContainer />
    </LoginPageContainer>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/kreator',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
