import { useEffect, useState } from 'react';
import Image from 'next/image';
import { match } from 'assert';

export default function SwitcherTheme (){
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(()=>{
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    /**
     * function to setIsDarkMode boolean and add/remove dark's class
     * @param e media event
     */
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      if (matchMedia.matches) {
        document.documentElement.classList.add('dark'); 
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    matchMedia.addEventListener('change', handleThemeChange)

    return ( ()=> {
      matchMedia.removeEventListener('change', handleThemeChange);
    }

    )
  }, [])

  return (
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className='rounded-lg border-secondary shadow-sm border-2 p-1 dark:bg-secondary dark:border-white dark:shadow-white'
      >
        <Image src={isDarkMode ? '/moon.png' : '/sun.png'} alt='switcher them' width={24} height={24} className='dark:rounded-full dark:p-1'/>
      </button>
  );
};

