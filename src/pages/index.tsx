import { AccordionContainer } from '@/components/homepage/Accordion/AccordionContainer/AccordionContainer';
import { CTA } from '@/components/homepage/CTA/CTA';
import { CardsContainer } from '@/components/homepage/Cards/CardsContainer/CardsContainer';
import { Hero } from '@/components/homepage/Hero/Hero';
import { HomePageContainer } from '@/components/homepage/HomepageContainer/HomePageContainer';

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
