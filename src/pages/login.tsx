import { LoginFormContainer } from '@/components/pages/loginpage/LoginFormContainer/LoginFormContainer';
import { LoginFormHeader } from '@/components/pages/loginpage/LoginFormHeader/LoginFormHeader';
import { LoginPageContainer } from '@/components/pages/loginpage/LoginPageContainer/LoginPageContainer';
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
