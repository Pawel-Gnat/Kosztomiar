import Image from 'next/image';
import styles from './LoginFormHeader.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { H1 } from '@/components/ui/Text/Text';

export const LoginFormHeader = () => {
  const router = useRouter();

  return (
    <div className={`${styles.container} show`} data-testid="login-form-header">
      <H1 content="Rozpocznij pracę z Kosztomiarem" />
      <Image
        src="/assets/img/hero-image.jpg"
        width={1400}
        height={1100}
        alt=""
        aria-hidden={true}
        className={styles.image}
        priority
      />
      <Link href="/login" className={styles.link} onClick={() => router.back()}>
        Powrót do poprzedniej strony
      </Link>
    </div>
  );
};
