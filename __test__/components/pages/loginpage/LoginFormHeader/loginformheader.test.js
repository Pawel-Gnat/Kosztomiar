import { fireEvent, render, screen } from '@testing-library/react';
import { LoginFormHeader } from '@/components/pages/loginpage/LoginFormHeader/LoginFormHeader';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { goBackRouterMock } from '../../../../../__mocks__/mock';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginFormHeader component', () => {
  it('Should render heading properly', () => {
    render(<LoginFormHeader />);

    const heading = screen.getByRole('heading', { level: 1 });
    const headingText = 'Rozpocznij pracę z Kosztomiarem';
    expect(heading).toHaveTextContent(headingText);
  });

  it('Should render hero image if user is authenticated', () => {
    const { container } = render(<LoginFormHeader />);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
  });

  it('Should render back to previous page link properly', () => {
    useRouter.mockReturnValue(goBackRouterMock);
    render(<LoginFormHeader />);

    const goBackLink = screen.getByRole('link', { name: 'Powrót do poprzedniej strony' });
    fireEvent.click(goBackLink);

    expect(goBackRouterMock.back).toHaveBeenCalled();
  });
});
