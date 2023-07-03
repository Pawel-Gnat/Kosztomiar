import Image from 'next/image';
import styles from './LoginFormHeader.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const LoginFormHeader = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Rozpocznij pracę z Kosztomiarem</h1>
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
