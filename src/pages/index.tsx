import { AccordionContainer } from '@/components/pages/homepage/Accordion/AccordionContainer/AccordionContainer';
import { CTA } from '@/components/pages/homepage/CTA/CTA';
import { CardsContainer } from '@/components/pages/homepage/Cards/CardsContainer/CardsContainer';
import { Hero } from '@/components/pages/homepage/Hero/Hero';
import { HomePageContainer } from '@/components/pages/homepage/HomepageContainer/HomePageContainer';

export default function HomePage() {
  return (
    <HomePageContainer>
      <Hero />
      <CardsContainer />
      <AccordionContainer />
      <CTA />
    </HomePageContainer>
  );
}
