import styles from './404PageContainer.module.css';
import stylesLink from '@/components/ui/Link/Link.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { H1 } from '@/components/ui/Text/Text';

export const WrongPageContainer = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <H1 content="Strona o podanym adresie nie istnieje" />
      <Link href="/" className={stylesLink.navlink} onClick={() => router.back()}>
        Powrót do poprzedniej strony
      </Link>
    </div>
  );
};
