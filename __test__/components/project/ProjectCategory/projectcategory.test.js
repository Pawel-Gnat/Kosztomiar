import { render, screen } from '@testing-library/react';
import { ProjectCategory } from '@/components/project/ProjectCategory/ProjectCategory';
import { nextAuthenticatedMock } from '../../../../__mocks__/mock';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ProjectCategory component', () => {
  const mockData = [
    {
      category: 'Test Category',
      elements: [
        { name: 'Element 1', value: 5, unit: 'kg', price: 10 },
        { name: 'Element 2', value: 10, unit: 'm', price: 20 },
      ],
    },
  ];

  it('Should render table elements properly if price is true', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    useRouter.mockReturnValue({
      query: { projektid: '1' },
    });

    render(
      <ProjectCategory
        name="Test Category"
        currency="PLN"
        price="true"
        data={mockData}
        id="123"
      />,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();

    const captionElement = screen.getByRole('table').querySelector('caption');
    expect(captionElement).toBeInTheDocument();
    expect(captionElement).toHaveTextContent('Test Category');

    expect(screen.getByText('Lp.')).toBeInTheDocument();
    expect(screen.getByText('Nazwa')).toBeInTheDocument();
    expect(screen.getByText('Ilość')).toBeInTheDocument();
    expect(screen.getByText('J.m.')).toBeInTheDocument();
    expect(screen.getByText('Cena')).toBeInTheDocument();

    const tfootElement = screen.getByRole('table').querySelector('tfoot');
    expect(tfootElement).toBeInTheDocument();
  });

  it('Should render table elements properly if price is false', () => {
    render(
      <ProjectCategory
        name="Test Category"
        currency="PLN"
        price="false"
        data={mockData}
        id="123"
      />,
    );

    expect(screen.queryByText('Cena')).toBeNull();

    const tfootElement = screen.getByRole('table').querySelector('tfoot');
    expect(tfootElement).toBeNull();
  });
});
