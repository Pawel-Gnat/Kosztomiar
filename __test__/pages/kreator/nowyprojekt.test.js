import { render, screen } from '@testing-library/react';
import NowyProjektPage from '@/pages/kreator/nowy-projekt';
import '@testing-library/jest-dom';
import { nextAuthenticatedMock } from '../../../__mocks__/mock';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NowyProjektPage', () => {
  it('Should render NewProjectForm component properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    render(<NowyProjektPage />);

    const newProjectForm = screen.getByRole('new-project-form');
    expect(newProjectForm).toBeInTheDocument();
  });
});
