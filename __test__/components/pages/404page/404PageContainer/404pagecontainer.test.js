import { fireEvent, render, screen } from '@testing-library/react';
import { WrongPageContainer } from '@/components/pages/404page/404PageContainer/404PageContainer';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { goBackRouterMock } from '../../../../../__mocks__/mock';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('404 page component', () => {
  it('Should render heading properly', () => {
    render(<WrongPageContainer />);

    const heading = screen.getByRole('heading', { level: 1 });
    const headingText = 'Strona o podanym adresie nie istnieje';
    expect(heading).toHaveTextContent(headingText);
  });

  it('Should render back to previous page link properly', () => {
    useRouter.mockReturnValue(goBackRouterMock);
    render(<WrongPageContainer />);

    const goBackLink = screen.getByRole('link', { name: 'Powrót do poprzedniej strony' });
    fireEvent.click(goBackLink);

    expect(goBackRouterMock.back).toHaveBeenCalled();
  });
});
