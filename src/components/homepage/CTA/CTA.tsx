import { Text } from '@/components/ui/Text/Text';
import styles from './CTA.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import Link from 'next/link';

export const CTA = () => {
  return (
    <section className={styles.cta}>
      <h4 className={styles.heading}>Zbuduj lepsze kosztorysy szybciej i sprawniej.</h4>
      <Text content=" Wypróbuj aplikację Kosztomiar i przekonaj się, jak wiele zyskasz!" />
      <Link href="/kreator" className={stylesLink.navlink}>
        Przejdź do aplikacji
      </Link>
    </section>
  );
};
