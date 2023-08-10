import { render, screen } from '@testing-library/react';
import { InitialView } from '@/components/pages/kreatorpage/InitialView/InitialView';
import '@testing-library/jest-dom';

describe('InitialView component', () => {
  it('Should render heading properly', () => {
    render(<InitialView />);

    const heading = screen.getByRole('heading', { level: 1 });
    const headingText = 'Rozpocznij pracę z Kosztomiarem';
    expect(heading).toHaveTextContent(headingText);
  });

  it('Should render svg image properly', () => {
    const { container } = render(<InitialView />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
