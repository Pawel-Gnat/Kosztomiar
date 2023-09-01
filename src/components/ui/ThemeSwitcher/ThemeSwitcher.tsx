import { ChangeEvent, useEffect } from 'react';
import styles from './ThemeSwitcher.module.css';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const ThemeSwitcher = () => {
  const { value, setValue } = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.body.dataset.theme = value;
  }, [value]);

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked ? 'dark' : 'light');
  };

  return (
    <>
      <input
        type="checkbox"
        id="themeSwitch"
        name="theme-switch"
        className={styles.input}
        onChange={toggleTheme}
        checked={value === 'dark'}
      />
      <label htmlFor="themeSwitch" className={styles.label}>
        <span></span>
      </label>
    </>
  );
};
