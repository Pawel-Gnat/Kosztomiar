import { fireEvent, render, screen } from '@testing-library/react';
import { NewProjectForm } from '@/components/project/NewProjectForm/NewProjectForm';
import { nextAuthenticatedMock } from '../../../../__mocks__/mock';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NewProjectForm component', () => {
  it('Should render "Nazwa projektu" text input properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    useRouter.mockReturnValue({
      query: { projektid: '1' },
    });

    render(<NewProjectForm />);

    const projectNameInput = screen.getByLabelText('Nazwa projektu');
    expect(projectNameInput).toBeInTheDocument();
  });

  it('Should render "Wybierz jednostki miary" text and inputs properly', () => {
    render(<NewProjectForm />);

    const paragraphText = screen.getByText('Wybierz jednostki miary:');
    expect(paragraphText).toBeInTheDocument();

    const m2CheckboxInput = screen.getByLabelText('metry kwadratowe');
    expect(m2CheckboxInput).toBeInTheDocument();

    const m3CheckboxInput = screen.getByLabelText('metry sześcienne');
    expect(m3CheckboxInput).toBeInTheDocument();

    const kgCheckboxInput = screen.getByLabelText('kilogramy');
    expect(kgCheckboxInput).toBeInTheDocument();

    const lCheckboxInput = screen.getByLabelText('litry');
    expect(lCheckboxInput).toBeInTheDocument();

    const sztCheckboxInput = screen.getByLabelText('sztuki');
    expect(sztCheckboxInput).toBeInTheDocument();
  });

  it('Should render currency text and inputs properly', () => {
    render(<NewProjectForm />);

    const paragraphText = screen.getByText('Uwzględniać ceny w projekcie?');
    expect(paragraphText).toBeInTheDocument();

    const radioInputWithYesValue = screen.getByLabelText('Tak');
    expect(radioInputWithYesValue).toBeInTheDocument();

    const radioInputWithNoValue = screen.getByLabelText('Nie');
    expect(radioInputWithNoValue).toBeInTheDocument();
  });

  it('Should render currency options properly when showCurrencies is true', () => {
    render(<NewProjectForm />);

    const radioInputWithYesValue = screen.getByLabelText('Tak');
    fireEvent.click(radioInputWithYesValue);

    const paragraphText = screen.getByText('Wybierz walutę');
    expect(paragraphText).toBeInTheDocument();

    const plnCurrency = screen.getByLabelText('PLN');
    expect(plnCurrency).toBeInTheDocument();

    const eurCurrency = screen.getByLabelText('EUR');
    expect(eurCurrency).toBeInTheDocument();

    const usdCurrency = screen.getByLabelText('USD');
    expect(usdCurrency).toBeInTheDocument();
  });

  it('Should render "Anuluj" button properly', () => {
    render(<NewProjectForm />);

    const cancelButton = screen.getByRole('button', { name: 'Anuluj' });
    expect(cancelButton).toBeInTheDocument();
  });

  it('Should render "Stwórz projekt" button properly', () => {
    render(<NewProjectForm />);

    const submitButton = screen.getByRole('button', { name: 'Stwórz projekt' });
    expect(submitButton).toBeInTheDocument();
  });
});
