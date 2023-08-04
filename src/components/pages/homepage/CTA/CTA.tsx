import { Text } from '@/components/ui/Text/Text';
import styles from './CTA.module.css';
import stylesLink from '../../../ui/Link/Link.module.css';
import Link from 'next/link';

export const CTA = () => {
  return (
    <section className={styles.cta} role="cta">
      <h4 className={styles.heading} data-aos="fade-up" data-aos-delay="200">
        Zbuduj lepsze kosztorysy szybciej i sprawniej.
      </h4>
      <div data-aos="fade-up" data-aos-delay="300">
        <Text content="Wypróbuj aplikację Kosztomiar i przekonaj się, jak wiele zyskasz!" />
      </div>
      <Link
        href="/kreator"
        className={stylesLink.navlink}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Przejdź do aplikacji
      </Link>
    </section>
  );
};
