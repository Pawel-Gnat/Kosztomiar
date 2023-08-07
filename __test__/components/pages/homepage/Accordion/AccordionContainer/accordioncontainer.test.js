import { render } from '@testing-library/react';
import { AccordionContainer } from '@/components/pages/homepage/Accordion/AccordionContainer/AccordionContainer';
import '@testing-library/jest-dom';

describe('Accordion container component', () => {
  it('Should render accordion with content', () => {
    const accordionContent = [
      {
        heading: 'Jak działa aplikacja Kosztomiar?',
        text: 'Aplikacja Kosztomiar umożliwia tworzenie projektów, wprowadzanie danych dotyczących jednostki miary i ceny, a następnie generowanie pliku PDF z kompletnym kosztorysem i sumowaniem kosztów.',
      },
      {
        heading: 'Czy aplikacja Kosztomiar zawiera opłaty?',
        text: 'Nie, aplikacja Kosztomiar nie zawiera żadnych opłat. Jest dostępna do użytku bezpłatnie.',
      },
      {
        heading:
          'Jakie informacje muszę wprowadzić do aplikacji Kosztomiar, aby otrzymać dokładny kosztorys?',
        text: 'Aby otrzymać dokładny kosztorys w aplikacji Kosztomiar, wystarczy utworzyć projekt i wprowadzić informacje dotyczące jednostki miary i ceny dla poszczególnych elementów. Aplikacja automatycznie generuje plik PDF z kompletnym kosztorysem oraz dokonuje precyzyjnego zliczania kosztów.',
      },
      {
        heading:
          'Czy Kosztomiar umożliwia udostępnianie kosztorysów klientom i współpracownikom?',
        text: 'Obecnie Kosztomiar nie posiada funkcjonalności umożliwiającej bezpośrednie udostępnianie kosztorysów klientom i współpracownikom. Jednak możesz łatwo eksportować kosztorysy do formatu PDF i udostępniać je drogą mailową lub innymi kanałami komunikacji.',
      },
      {
        heading: 'Czy mogę importować istniejące dane do aplikacji Kosztomiar?',
        text: 'Aktualnie, aplikacja Kosztomiar nie obsługuje importu istniejących danych.',
      },
      {
        heading:
          'Czy Kosztomiar oferuje jakieś funkcje dodatkowe, które mogą ułatwić proces tworzenia kosztorysów?',
        text: 'Tak, Kosztomiar oferuje kilka funkcji dodatkowych, które ułatwiają proces tworzenia kosztorysów. Aplikacja automatycznie sumuje koszty dla poszczególnych elementów i całkowity kosztorys. Ponadto, generuje gotowy plik PDF z kosztorysem. Dodatkowo, Kosztomiar przechowuje wprowadzone dane na serwerze, co zapewnia łatwy dostęp do nich w dowolnym momencie.',
      },
      {
        heading:
          'Czy aplikacja Kosztomiar oferuje wsparcie techniczne w przypadku jakichkolwiek pytań lub problemów?',
        text: 'Tak, aplikacja Kosztomiar oferuje wsparcie techniczne dla użytkowników w przypadku pytań lub problemów. Możesz skontaktować się poprzez profil LinkedIn: https://www.linkedin.com/in/paweł-gnat/. Aplikacja jest ciągle w fazie testowej, dlatego istnieje możliwość, że mogą wystąpić pewne ograniczenia lub niedoskonałości. Zachęcamy do udzielania swoich uwag i opinii, które pomogą w dalszym rozwoju aplikacji.',
      },
    ];

    const { getByText } = render(
      <AccordionContainer accordionContent={accordionContent} />,
    );

    accordionContent.forEach((item) => {
      const heading = getByText(item.heading);
      expect(heading).toBeInTheDocument();

      const text = getByText(item.text);
      expect(text).toBeInTheDocument();
    });
  });
});
