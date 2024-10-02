import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SwitcherTheme (){
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className='rounded-lg border-secondary shadow-sm border-2 p-1 dark:bg-secondary dark:border-white dark:shadow-white'
      >
        <Image src={isDarkMode ? '/moon.png' : '/sun.png'} alt='switcher them' width={24} height={24} className='dark:rounded-full dark:p-1'/>
      </button>
  );
};

