import { render, screen } from '@testing-library/react';
import { DashboardNavbar } from '@/components/layout/DashboardNavbar/DashboardNavbar';
import '@testing-library/jest-dom';
import {
  nextAuthenticatedMock,
  nextUnauthenticatedMock,
} from '../../../../__mocks__/mock';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

describe('DashboardNavbar component', () => {
  it('Should render nav properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    render(<DashboardNavbar />);
    expect(screen.getByRole('dashboard-navbar')).toBeInTheDocument;
  });

  it('Should render homepage link properly', () => {
    render(<DashboardNavbar />);
    expect(screen.getByRole('link', { name: 'Kosztomiar' })).toHaveAttribute('href', '/');
  });

  it('Should render nowy projekt link properly', () => {
    render(<DashboardNavbar />);
    expect(screen.getByRole('link', { name: 'Nowy projekt' })).toHaveAttribute(
      'href',
      '/kreator/nowy-projekt',
    );
  });

  it('Should render profil link properly if user is authenticated', () => {
    render(<DashboardNavbar />);
    expect(screen.getByRole('link', { name: 'Twój profil' })).toHaveAttribute(
      'href',
      '/kreator/profil',
    );
    expect(screen.queryByRole('link', { name: 'Zaloguj się' })).toBeNull();
  });

  it('Should render login link properly if user is not authenticated', () => {
    useSession.mockReturnValueOnce(nextUnauthenticatedMock);
    render(<DashboardNavbar />);
    expect(screen.queryByRole('link', { name: 'Twój profil' })).toBeNull();
    expect(screen.getByRole('link', { name: 'Zaloguj się' })).toHaveAttribute(
      'href',
      '/login',
    );
  });
});
