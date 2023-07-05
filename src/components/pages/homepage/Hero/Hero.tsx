import Link from 'next/link';
import styles from './Hero.module.css';
import stylesLink from '../../../ui/Link/Link.module.css';
import Image from 'next/image';
import { Text } from '@/components/ui/Text/Text';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles['text-container']}>
        <h1 className={styles.heading}>
          Twórz raporty, które przekształcają Twoje dane w wartość biznesową
        </h1>
        <Text
          content="Niezależnie od branży, aplikacja zapewnia narzędzia do efektywnego
          tworzenia i prezentowania kosztów, co pomaga w podejmowaniu mądrych decyzji
          biznesowych."
        />
        <div className={styles.links}>
          <Link href="/kreator" className={stylesLink.navlink}>
            Wypróbuj
          </Link>
          <Link href="/login" className={stylesLink.navlink}>
            Zaloguj się
          </Link>
        </div>
      </div>
      <Image
        src="/assets/img/hero-image.jpg"
        width={1000}
        height={700}
        alt=""
        aria-hidden={true}
        className={styles.image}
      />
    </section>
  );
};
