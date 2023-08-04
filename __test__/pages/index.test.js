import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/index';
import '@testing-library/jest-dom';
import { nextAuthenticatedMock } from '../../__mocks__/mock';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

describe('HomePage', () => {
  it('Should render Hero component properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    render(<HomePage />);

    const heroComponent = screen.getByRole('hero');
    expect(heroComponent).toBeInTheDocument();
  });

  it('Should render Footer component properly', () => {
    render(<HomePage />);

    const footerComponent = screen.getByRole('footer');
    expect(footerComponent).toBeInTheDocument();
  });
});
