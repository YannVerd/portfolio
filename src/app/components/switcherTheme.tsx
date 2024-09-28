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
        className="bg-secondary hover:bg-secondaryLight text-white font-bold py-2 px-4 rounded"
      >
        {isDarkMode ? 'Mode Dark' : 'Mode Light'}
      </button>
  );
};

