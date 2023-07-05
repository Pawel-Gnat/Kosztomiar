import { PDFImage } from '@/assets/svg/PDFImage';
import { Card } from '../Card/Card';
import styles from './CardsContainer.module.css';
import { CloudsImage } from '@/assets/svg/CloudsImage';
import { PhoneImage } from '@/assets/svg/PhoneImage';

const cardsContent = [
  {
    heading: 'Generowanie kosztorysów w aplikacji',
    text: 'Aplikacja umożliwia szybkie i łatwe generowanie kosztorysów bez konieczności korzystania z zewnętrznych narzędzi. Dzięki intuicyjnemu interfejsowi i zaawansowanym funkcjom, tworzenie dokładnych i profesjonalnych kosztorysów jeszcze nigdy nie było tak proste.',
    img: '/assets/img/new-project-img.jpg',
  },
  {
    heading: 'Przechowywanie danych na serwerze',
    text: 'Nie musisz martwić się o utratę danych czy zgubienie plików. Aplikacja umożliwia przechowywanie wszystkich kosztorysów na bezpiecznym serwerze. Możesz mieć pewność, że Twoje dane są chronione i zawsze dostępne, gdy ich potrzebujesz.',
    img: '',
    svg: <CloudsImage />,
  },
  {
    heading: 'Eksportowanie do pliku PDF',
    text: 'Dzięki aplikacji możesz łatwo eksportować swoje kosztorysy do pliku PDF. To pozwala na wygodne udostępnianie dokumentów, wysyłanie ich drogą elektroniczną lub drukowanie w celu udostępnienia w formie papierowej. Twój kosztorys zawsze będzie prezentował się profesjonalnie i czytelnie.',
    img: '',
    svg: <PDFImage />,
  },
  {
    heading: 'Dostęp również w wersji mobilnej',
    text: 'Aplikacja jest dostępna nie tylko na komputerach, ale także w wersji mobilnej. Możesz korzystać z niej na smartfonie lub tablecie, co daje Ci elastyczność i wygodę pracy w dowolnym miejscu i o każdej porze. Bez względu na to, czy jesteś w biurze, na budowie czy w podróży służbowej, zawsze masz dostęp do swoich kosztorysów.',
    img: '',
    svg: <PhoneImage />,
  },
];

export const CardsContainer = () => {
  return (
    <section className={styles.cards}>
      {cardsContent.map((card, index) => (
        <Card
          key={index}
          heading={card.heading}
          text={card.text}
          img={card.img}
          svg={card.svg}
        />
      ))}
    </section>
  );
};
