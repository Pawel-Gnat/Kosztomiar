import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/index';
import '@testing-library/jest-dom';
jest.mock('next-auth/react');

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: 1,
    user: { username: 'test' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

describe('HomePage', () => {
  it('Should render Hero component properly', () => {
    render(<HomePage />);

    const heroComponent = screen.getByRole('hero');
    expect(heroComponent).toBeInTheDocument();
  });
});
