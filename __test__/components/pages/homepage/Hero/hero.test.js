import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/pages/homepage/Hero/Hero';
import '@testing-library/jest-dom';
import {
  nextAuthenticatedMock,
  nextUnauthenticatedMock,
} from '../../../../../__mocks__/mock';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

describe('Hero component', () => {
  it('Should render H1 tag properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    const headingText =
      'Twórz raporty, które przekształcają Twoje dane w wartość biznesową';

    expect(heading).toHaveTextContent(headingText);
  });

  it('Should render paragraph text properly', () => {
    render(<Hero />);

    const paragraph = screen.getByText(
      `Niezależnie od branży, aplikacja zapewnia narzędzia do efektywnego tworzenia i prezentowania kosztów, co pomaga w podejmowaniu mądrych decyzji biznesowych.`,
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('Should render kreator link properly', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: 'Wypróbuj' })).toHaveAttribute(
      'href',
      '/kreator',
    );
  });

  it('Should render profil link properly if user is authenticated', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: 'Twój profil' })).toHaveAttribute(
      'href',
      '/kreator/profil',
    );

    expect(screen.queryByRole('link', { name: 'Zaloguj się' })).toBeNull();
  });

  it('Should render login link properly if user is not authenticated', () => {
    useSession.mockReturnValueOnce(nextUnauthenticatedMock);
    render(<Hero />);

    expect(screen.queryByRole('link', { name: 'Twój profil' })).toBeNull();

    expect(screen.getByRole('link', { name: 'Zaloguj się' })).toHaveAttribute(
      'href',
      '/login',
    );
  });

  it('Should render profil link properly if user is authenticated', () => {
    const { container } = render(<Hero />);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
  });
});
