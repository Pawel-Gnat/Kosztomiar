import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/login';
import '@testing-library/jest-dom';
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  it('Should render LoginFormHeader component properly', () => {
    render(<LoginPage />);

    const loginFormHeader = screen.getByTestId('login-form-header');
    expect(loginFormHeader).toBeInTheDocument();
  });

  it('Should render LoginFormContainer component properly', () => {
    render(<LoginPage />);

    const loginFormContainer = screen.getByTestId('login-form-container');
    expect(loginFormContainer).toBeInTheDocument();
  });
});
