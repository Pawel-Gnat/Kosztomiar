import { render } from '@testing-library/react';
import { CardsContainer } from '@/components/pages/homepage/Cards/CardsContainer/CardsContainer';
import '@testing-library/jest-dom';

describe('Cards container component', () => {
  it('Should render cards with content', () => {
    const cardsContent = [
      {
        heading: 'Generowanie kosztorysów w aplikacji',
        text: 'Aplikacja umożliwia szybkie i łatwe generowanie kosztorysów bez konieczności korzystania z zewnętrznych narzędzi. Dzięki intuicyjnemu interfejsowi i zaawansowanym funkcjom, tworzenie dokładnych i profesjonalnych kosztorysów jeszcze nigdy nie było tak proste.',
        img: '@/assets/img/new-project-img.jpg',
      },
      {
        heading: 'Przechowywanie danych na serwerze',
        text: 'Nie musisz martwić się o utratę danych czy zgubienie plików. Aplikacja umożliwia przechowywanie wszystkich kosztorysów na bezpiecznym serwerze. Możesz mieć pewność, że Twoje dane są chronione i zawsze dostępne, gdy ich potrzebujesz.',
        img: '',
        svg: '@/assets/svg/CloudsImage',
      },
      {
        heading: 'Eksportowanie do pliku PDF',
        text: 'Dzięki aplikacji możesz łatwo eksportować swoje kosztorysy do pliku PDF. To pozwala na wygodne udostępnianie dokumentów, wysyłanie ich drogą elektroniczną lub drukowanie w celu udostępnienia w formie papierowej. Twój kosztorys zawsze będzie prezentował się profesjonalnie i czytelnie.',
        img: '',
        svg: '@/assets/svg/PDFImage',
      },
      {
        heading: 'Dostęp również w wersji mobilnej',
        text: 'Aplikacja jest dostępna nie tylko na komputerach, ale także w wersji mobilnej. Możesz korzystać z niej na smartfonie lub tablecie, co daje Ci elastyczność i wygodę pracy w dowolnym miejscu i o każdej porze. Bez względu na to, czy jesteś w biurze, na budowie czy w podróży służbowej, zawsze masz dostęp do swoich kosztorysów.',
        img: '',
        svg: '@/assets/svg/PhoneImage',
      },
    ];

    const { container, getByText } = render(
      <CardsContainer cardsContent={cardsContent} />,
    );

    cardsContent.forEach((card) => {
      const heading = getByText(card.heading);
      expect(heading).toBeInTheDocument();

      const text = getByText(card.text);
      expect(text).toBeInTheDocument();

      if (card.img) {
        const image = container.querySelector('img');
        expect(image).toBeInTheDocument();
      } else {
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      }
    });
  });
});
