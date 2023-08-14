import { fireEvent, render, screen } from '@testing-library/react';
import { NewCategoryForm } from '@/components/project/NewCategoryForm/NewCategoryForm';
import { nextAuthenticatedMock } from '../../../../__mocks__/mock';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NewCategoryForm component', () => {
  it('Should render "Stwórz kategorię" button when form is inactive', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    useRouter.mockReturnValue({
      query: { projektid: '1' },
    });

    render(<NewCategoryForm />);

    const createButton = screen.getByText('Stwórz kategorię');
    expect(createButton).toBeInTheDocument();
  });

  it('Should render form when "Stwórz kategorię" button is clicked', () => {
    render(<NewCategoryForm />);

    const createButton = screen.getByText('Stwórz kategorię');
    fireEvent.click(createButton);

    const categoryForm = screen.getByRole('category-form');
    expect(categoryForm).toBeInTheDocument();
  });
});
