import { render, screen } from '@testing-library/react';
import { CTA } from '@/components/pages/homepage/CTA/CTA';
import '@testing-library/jest-dom';

describe('CTA component', () => {
  it('Should render H4 tag properly', () => {
    render(<CTA />);
    const heading = screen.getByRole('heading', { level: 4 });
    const headingText = 'Zbuduj lepsze kosztorysy szybciej i sprawniej.';
    expect(heading).toHaveTextContent(headingText);
  });

  it('Should render paragraph text properly', () => {
    render(<CTA />);
    const paragraph = screen.getByText(
      `Wypróbuj aplikację Kosztomiar i przekonaj się, jak wiele zyskasz!`,
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('Should render kreator link properly', () => {
    render(<CTA />);
    expect(screen.getByRole('link', { name: 'Przejdź do aplikacji' })).toHaveAttribute(
      'href',
      '/kreator',
    );
  });
});
