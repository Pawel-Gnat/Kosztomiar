import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewCategoryElementForm } from '@/components/project/NewCategoryElementForm/NewCategoryElementForm';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../../src/hooks/useProject', () => ({
  useProject: jest.fn(() => ({
    measurements: ['m2', 'm3'],
  })),
}));

describe('NewCategoryElementForm component', () => {
  const onSubmit = jest.fn();
  const setIsFormActive = jest.fn();

  it('Should render input elements properly when isFormActive is true', () => {
    useRouter.mockReturnValue({
      query: { projektid: '1' },
    });

    render(
      <NewCategoryElementForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        field={{ value: '', onChange: () => {} }}
        reset={() => {}}
        isFormActive={true}
        setIsFormActive={() => {}}
        loading={false}
      />,
    );

    const nameInput = screen.getByLabelText('Nazwa');
    expect(nameInput).toBeInTheDocument();

    const valueInput = screen.getByLabelText('Ilość');
    expect(valueInput).toBeInTheDocument();

    const unitSelect = screen.getByRole('combobox', { name: 'J.m.' });
    expect(unitSelect).toBeInTheDocument();

    const cancelButton = screen.getByText('Anuluj');
    expect(cancelButton).toBeInTheDocument();

    const submitButton = screen.getByText('Dodaj');
    expect(submitButton).toBeInTheDocument();
  });

  it('Should render "Dodaj materiał" button when isFormActive is false', () => {
    render(
      <NewCategoryElementForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        field={{ value: '', onChange: () => {} }}
        reset={() => {}}
        isFormActive={false}
        setIsFormActive={() => {}}
        loading={false}
      />,
    );

    const addButton = screen.getByText('Dodaj materiał');
    expect(addButton).toBeInTheDocument();
  });

  it('Check isFormActive when "Dodaj materiał" button is clicked', () => {
    const { rerender } = render(
      <NewCategoryElementForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        field={{ value: '', onChange: () => {} }}
        reset={() => {}}
        isFormActive={false}
        setIsFormActive={() => {}}
        loading={false}
      />,
    );

    let addButton = screen.getByText('Dodaj materiał');
    userEvent.click(addButton);

    rerender(
      <NewCategoryElementForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        field={{ value: '', onChange: () => {} }}
        reset={() => {}}
        isFormActive={true}
        setIsFormActive={() => {}}
        loading={false}
      />,
    );

    addButton = screen.queryByText('Dodaj materiał');
    expect(addButton).toBeNull();
  });

  it('Check isFormActive when "Anuluj" button is clicked', () => {
    const resetMock = jest.fn();

    const { rerender } = render(
      <NewCategoryElementForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        field={{ value: '', onChange: () => {} }}
        reset={resetMock}
        isFormActive={true}
        setIsFormActive={setIsFormActive}
        loading={false}
      />,
    );

    let cancelButton = screen.getByText('Anuluj');
    userEvent.click(cancelButton);

    rerender(
      <NewCategoryElementForm
        onSubmit={onSubmit}
        error={{}}
        register={() => {}}
        field={{ value: '', onChange: () => {} }}
        reset={resetMock}
        isFormActive={false}
        setIsFormActive={setIsFormActive}
        loading={false}
      />,
    );

    cancelButton = screen.queryByText('Anuluj');
    expect(cancelButton).toBeNull();
  });
});
