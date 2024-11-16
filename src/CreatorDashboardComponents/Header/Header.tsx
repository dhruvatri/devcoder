import React from 'react';
import { User, BookOpen } from 'lucide-react';
import styles from './Header.module.css';
import { MdPadding } from 'react-icons/md';

interface HeaderProps {
  creatorName: string;
}

const Header: React.FC<HeaderProps> = ({ creatorName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <BookOpen className={styles.logo} size={40} />
        <div>
          <h1 className={styles.title}>Welcome, {creatorName}</h1>
          <p className={styles.subtitle}>Creator</p>
        </div>
      </div>
      <User className={styles.userIcon} size={40} />
    </header>
  );
};

export default Header;