import { fireEvent, render, screen } from '@testing-library/react';
import { ProjectCategoriesList } from '@/components/project/ProjectCategoriesList/ProjectCategoriesList';
import { nextAuthenticatedMock } from '../../../../__mocks__/mock';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');

describe('ProjectCategoriesList component', () => {
  const mockProject = {
    id: '1',
    data: [{ category: 'Category 1' }, { category: 'Category 2' }],
  };

  it('Should render category info text properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);

    render(<ProjectCategoriesList project={mockProject} />);

    const paragraphText = screen.getByText('Twoje kategorie w projekcie');
    expect(paragraphText).toBeInTheDocument();
  });

  it('Should render CategoryList component properly', () => {
    render(<ProjectCategoriesList project={mockProject} />);

    const categoryList = screen.getByRole('category-list');
    expect(categoryList).toBeInTheDocument();

    const category1 = screen.getByText('Category 1');
    expect(category1).toBeInTheDocument();

    const category2 = screen.getByText('Category 2');
    expect(category2).toBeInTheDocument();

    const editButtons = screen.getAllByRole('button', { name: 'Edytuj nazwę' });
    expect(editButtons).toHaveLength(2);

    const deleteButtons = screen.getAllByRole('button', { name: 'Usuń kategorię' });
    expect(deleteButtons).toHaveLength(2);
  });

  it('Should render CategoryForm component properly if isActive', () => {
    render(<ProjectCategoriesList project={mockProject} />);

    const editButtons = screen.getAllByRole('button', { name: 'Edytuj nazwę' });
    fireEvent.click(editButtons[0]);

    const categoryForm = screen.getByRole('category-form');
    expect(categoryForm).toBeInTheDocument();
  });
});
