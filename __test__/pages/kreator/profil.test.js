import { fireEvent, render, screen } from '@testing-library/react';
import ProfilPage from '@/pages/kreator/profil';
import '@testing-library/jest-dom';
import { nextAuthenticatedMock } from '../../../__mocks__/mock';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

jest.mock('next-auth/react');

describe('ProfilPage', () => {
  it('Should render ProfilPage component properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    const { container } = render(<ProfilPage />);

    const svgImage = container.querySelector('svg');
    expect(svgImage).toBeInTheDocument();

    expect(screen.getByText('Ustawienia profilu użytkownika')).toBeInTheDocument();

    expect(screen.getByRole('change-password-form')).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', { name: 'Wyloguj się' });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalled();
  });
});
