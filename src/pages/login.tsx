import Navbar from '@/components/layout/Navbar/Navbar';
import { LoginFormContainer } from '@/components/login/LoginFormContainer/LoginFormContainer';
import { LoginFormHeader } from '@/components/login/LoginFormHeader/LoginFormHeader';
import { LoginPageContainer } from '@/components/login/LoginPageContainer/LoginPageContainer';

export default function LoginPage() {
  return (
    <LoginPageContainer>
      <LoginFormHeader />
      <LoginFormContainer />
    </LoginPageContainer>
  );
}
