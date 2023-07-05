import { LoginFormContainer } from '@/components/pages/loginpage/LoginFormContainer/LoginFormContainer';
import { LoginFormHeader } from '@/components/pages/loginpage/LoginFormHeader/LoginFormHeader';
import { LoginPageContainer } from '@/components/pages/loginpage/LoginPageContainer/LoginPageContainer';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <p>LoginPage</p>
    </>
  );
}
