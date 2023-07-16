import Link from 'next/link';
import styles from './DashboardNavbar.module.css';
import stylesLink from '../../ui/Link/Link.module.css';
import { FC, useContext } from 'react';
import { UserContext } from '@/store/user-context';
import { FiLogIn, FiFolder, FiPlusSquare } from 'react-icons/fi';
import { Text } from '@/components/ui/Text/Text';
import { Logo } from '@/assets/svg/Logo';
import { getSession, useSession } from 'next-auth/react';
import { ProjectList } from '@/components/pages/kreatorpage/ProjectList/ProjectList';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';

// export const DashboardNavbar: FC<{ session: Session }> = ({ session }) => {
export const DashboardNavbar = () => {
  const context = useContext(UserContext);
  const { data: session, status } = useSession();

  // console.log(context, session);

  const projectList =
    context.projects.length > 0 ? (
      <ProjectList projects={context.projects} />
    ) : (
      <Text content="Brak projektów" />
    );

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/" className={stylesLink.logo}>
              <Logo />
              <Text content="Kosztomiar" />
            </Link>
          </div>

          <div className={styles.projects}>
            <div>
              <FiFolder className={styles.icon} />
              <Text content="Projekty" />
            </div>
            {projectList}
          </div>

          <div className={styles.buttons}>
            <Link
              href="/kreator/nowy-projekt"
              className={`${stylesLink.accent} ${stylesLink.navlink}`}
            >
              <FiPlusSquare />
              Nowy projekt
            </Link>

            {session ? (
              <Link href="/kreator/profil" className={stylesLink.navlink}>
                Twój profil
              </Link>
            ) : (
              <Link href="/login" className={stylesLink.navlink}>
                <FiLogIn />
                Zaloguj się
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession({ req: context.req });

//   return {
//     props: { session },
//   };
// }
