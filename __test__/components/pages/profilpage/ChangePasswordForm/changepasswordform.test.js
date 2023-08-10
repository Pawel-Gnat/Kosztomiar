import { render, screen } from '@testing-library/react';
import { ChangePasswordForm } from '@/components/pages/profilpage/ChangePasswordForm/ChangePasswordForm';
import '@testing-library/jest-dom';

describe('ChangePasswordForm component', () => {
  it('Should render form inputs properly', () => {
    render(<ChangePasswordForm />);

    expect(screen.getByLabelText('Obecne hasło')).toBeInTheDocument();
    expect(screen.getByLabelText('Nowe hasło')).toBeInTheDocument();
  });

  it('Should render button properly', () => {
    render(<ChangePasswordForm />);

    expect(screen.getByRole('button', { name: 'Zmień hasło' })).toBeInTheDocument();
  });
});
