import { render, screen } from '@testing-library/react';
import {
  LoginForm,
  RegisterForm,
} from '@/components/pages/loginpage/AuthUserForm/AuthUserForm';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm component', () => {
  it('Should render labels properly', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Adres e-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
  });

  it('Should render button properly', () => {
    render(<LoginForm />);

    expect(screen.getByRole('button', { name: 'Zaloguj się' })).toBeInTheDocument();
  });
});

describe('RegisterForm component', () => {
  it('Should render labels properly', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('Twoje imię')).toBeInTheDocument();
    expect(screen.getByLabelText('Adres e-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
    expect(screen.getByLabelText('Powtórz hasło')).toBeInTheDocument();
  });

  it('Should render button properly', () => {
    render(<RegisterForm />);

    expect(screen.getByRole('button', { name: 'Załóż konto' })).toBeInTheDocument();
  });
});
