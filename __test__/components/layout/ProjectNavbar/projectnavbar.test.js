import { render, screen } from '@testing-library/react';
import { ProjectNavbar } from '@/components/layout/ProjectNavbar/ProjectNavbar';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/kreator/[projektid]',
    query: { projektid: '34' },
  }),
}));

describe('ProjectNavbar component', () => {
  it('Should render nav properly', () => {
    render(<ProjectNavbar />);
    expect(screen.getByRole('project-navbar')).toBeInTheDocument;
  });

  it('Should render Dane link properly', () => {
    render(<ProjectNavbar id="34" />);
    expect(screen.getByRole('link', { name: 'Dane' })).toHaveAttribute(
      'href',
      '/kreator/34',
    );
  });

  it('Should render Ustawienia link properly', () => {
    render(<ProjectNavbar id="34" />);
    expect(screen.getByRole('link', { name: 'Ustawienia' })).toHaveAttribute(
      'href',
      '/kreator/34/ustawienia',
    );
  });

  it('Should render Podgląd link properly', () => {
    render(<ProjectNavbar id="34" />);
    expect(screen.getByRole('link', { name: 'Podgląd' })).toHaveAttribute(
      'href',
      '/kreator/34/podglad',
    );
  });
});
