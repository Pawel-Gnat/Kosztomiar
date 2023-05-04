import './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/">Strona główna</Link>
        <Link href="/kreator">Kreator</Link>
        <Link href="/login">Zaloguj się</Link>
      </nav>
    </header>
  );
}
