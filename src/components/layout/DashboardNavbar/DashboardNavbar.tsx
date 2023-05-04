import Link from 'next/link';
import './DashboardNavbar.module.css';

export const DashboardNavbar = () => {
  return (
    <>
      <header>
        <nav>
          <p>Projekty</p>
          <Link href="/kreator/nowy-projekt">Nowy projekt</Link>
          <Link href="/login">Zaloguj się</Link>
        </nav>
      </header>
    </>
  );
};
