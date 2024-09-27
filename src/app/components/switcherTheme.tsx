import { useEffect, useState } from 'react';

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
        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md"
      >
        {isDarkMode ? 'Mode Dark' : 'Mode Light'}
      </button>
  );
};

