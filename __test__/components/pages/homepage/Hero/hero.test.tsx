import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/pages/homepage/Hero/Hero';
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

describe('Hero component', () => {
  it('Should render H1 tag properly', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading');
    const headingText =
      'Twórz raporty, które przekształcają Twoje dane w wartość biznesową';

    expect(heading).toHaveTextContent(headingText);
  });
});
