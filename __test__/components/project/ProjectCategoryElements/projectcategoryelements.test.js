import { render, screen } from '@testing-library/react';
import { ProjectCategoryElements } from '@/components/project/ProjectCategoryElements/ProjectCategoryElements';
import '@testing-library/jest-dom';

describe('ProjectCategoryElements component', () => {
  const mockElements = [{ name: 'Element 1', value: 5, unit: 'kg', price: 10 }];

  it('Should render table data elements properly', () => {
    render(<ProjectCategoryElements data={mockElements} currency="PLN" price="true" />);

    expect(screen.getByText('Element 1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByText('10 PLN')).toBeInTheDocument();
  });

  it('Should render button elements properly', () => {
    render(<ProjectCategoryElements data={mockElements} />);

    expect(screen.getByRole('button', { name: 'Edytuj' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Usuń' })).toBeInTheDocument();
  });
});
