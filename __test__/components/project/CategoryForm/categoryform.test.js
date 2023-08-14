import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryForm } from '@/components/project/CategoryForm/CategoryForm';
import '@testing-library/jest-dom';

describe('CategoryForm component', () => {
  const onSubmit = jest.fn();
  const onClick = jest.fn();

  it('Should render input properly', () => {
    render(
      <CategoryForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        onClick={onClick}
        loading={false}
      />,
    );

    const inputElement = screen.getByLabelText('Nazwa kategorii');
    expect(inputElement).toBeInTheDocument();
  });

  it('Should render cancel button properly', () => {
    render(
      <CategoryForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        onClick={onClick}
        loading={false}
      />,
    );

    const cancelButton = screen.getByText('Anuluj');
    expect(cancelButton).toBeInTheDocument();
  });

  it('Should render submit button properly', () => {
    render(
      <CategoryForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        onClick={onClick}
        loading={false}
      />,
    );

    const submitButton = screen.getByText('Dodaj');
    expect(submitButton).toBeInTheDocument();
  });

  it('Should render loading state properly', () => {
    const { rerender } = render(
      <CategoryForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        onClick={onClick}
        loading={false}
      />,
    );

    const submitButton = screen.getByText('Dodaj');
    let loadingElement = screen.queryByLabelText('revolving-dot-loading');
    expect(loadingElement).toBeNull();

    userEvent.click(submitButton);

    rerender(
      <CategoryForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        onClick={onClick}
        loading={true}
      />,
    );

    loadingElement = screen.getByTestId('revolving-dot-loading');
    expect(loadingElement).toBeInTheDocument();
  });
});
