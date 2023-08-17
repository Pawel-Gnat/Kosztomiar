import { render, screen } from '@testing-library/react';
import { ProjectContainer } from '@/components/project/ProjectContainer/ProjectContainer';
import { nextAuthenticatedMock } from '../../../../__mocks__/mock';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ProjectContainer component', () => {
  const currency = 'PLN';
  const measurements = ['cm', 'kg'];
  const price = '100';
  const data = [
    {
      category: 'Test Category',
      elements: [
        { name: 'Element 1', value: 5, unit: 'kg', price: 10 },
        { name: 'Element 2', value: 10, unit: 'm', price: 20 },
      ],
    },
  ];
  const id = '123';

  it('Should render ProjectContainer elements properly', () => {
    useSession.mockReturnValue(nextAuthenticatedMock);
    useRouter.mockReturnValue({
      query: { projektid: '1' },
    });

    render(
      <ProjectContainer
        currency={currency}
        measurements={measurements}
        price={price}
        data={data}
        id={id}
      />,
    );

    data.forEach((category) => {
      const categoryElement = screen.getByText(category.category);
      expect(categoryElement).toBeInTheDocument();
    });

    const buttonFromNewCategoryFormElement = screen.getByRole('button', {
      name: 'Stwórz kategorię',
    });
    expect(buttonFromNewCategoryFormElement).toBeInTheDocument();
  });
});
