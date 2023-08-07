import { render, screen } from '@testing-library/react';
import Navbar from '@/components/pages/homepage/Navbar/Navbar';
import '@testing-library/jest-dom';
import {
  nextAuthenticatedMock,
  nextUnauthenticatedMock,
} from '../../../../../__mocks__/mock';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

describe('Navbar component', () => {
  it('Should render homepage link properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'Kosztomiar' })).toHaveAttribute('href', '/');
  });

  it('Should render homepage link logo properly', () => {
    const { container } = render(<Navbar />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('Should render kreator link properly', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'Kreator' })).toHaveAttribute(
      'href',
      '/kreator',
    );
  });

  it('Should render profil link properly if user is authenticated', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'Twój profil' })).toHaveAttribute(
      'href',
      '/kreator/profil',
    );

    expect(screen.queryByRole('link', { name: 'Zaloguj się' })).toBeNull();
  });

  it('Should render login link properly if user is not authenticated', () => {
    useSession.mockReturnValueOnce(nextUnauthenticatedMock);
    render(<Navbar />);

    expect(screen.queryByRole('link', { name: 'Twój profil' })).toBeNull();

    expect(screen.getByRole('link', { name: 'Zaloguj się' })).toHaveAttribute(
      'href',
      '/login',
    );
  });
});
