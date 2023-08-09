import { fireEvent, render, screen } from '@testing-library/react';
import { LoginFormContainer } from '@/components/pages/loginpage/LoginFormContainer/LoginFormContainer';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginFormContainer component', () => {
  it('Should render paragraph text properly', () => {
    render(<LoginFormContainer />);
    const paragraph = screen.getByText(
      'Skorzystaj z możliwości jakie daje własne konto w aplikacji. Posiadaj dostęp do swoich danych gdziekolwiek jesteś!',
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('Should render heading properly on login state', () => {
    render(<LoginFormContainer />);

    const heading = screen.getByRole('heading', { level: 2 });
    const headingText = 'Logowanie';
    expect(heading).toHaveTextContent(headingText);
    expect(screen.queryByText('Rejestracja')).not.toBeInTheDocument();
  });

  it('Should render heading properly on register state', () => {
    render(<LoginFormContainer />);

    const switchStateButton = screen.getByRole('button', {
      name: 'Nie masz konta? Zarejestruj się!',
    });
    fireEvent.click(switchStateButton);

    const heading = screen.getByRole('heading', { level: 2 });
    const headingText = 'Rejestracja';
    expect(heading).toHaveTextContent(headingText);
    expect(screen.queryByText('Logowanie')).not.toBeInTheDocument();
    expect(screen.queryByText('Masz już konto? Zaloguj się!')).toBeInTheDocument();
  });
});
