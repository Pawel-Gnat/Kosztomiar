import { WrongPageContainer } from '@/components/pages/404page/404PageContainer/404PageContainer';
import { HomePageContainer } from '@/components/pages/homepage/HomepageContainer/HomePageContainer';

export default function Custom404() {
  return (
    <HomePageContainer>
      <WrongPageContainer />
    </HomePageContainer>
  );
}
