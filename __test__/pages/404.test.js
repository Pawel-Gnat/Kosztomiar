import { render, screen } from '@testing-library/react';
import WrongPage from '@/pages/404';
import '@testing-library/jest-dom';
import { goBackRouterMock, nextAuthenticatedMock } from '../../__mocks__/mock';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('404Page', () => {
  it('Should render 404PageContainer component properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    useRouter.mockReturnValue(goBackRouterMock);
    render(<WrongPage />);

    const wrongPageContainer = screen.getByRole('404page');
    expect(wrongPageContainer).toBeInTheDocument();
  });
});
