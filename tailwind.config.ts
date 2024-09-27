import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
       secondary: '#048b9a',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glowBlue: {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(4, 139, 154, 0.8)' }, // 
          '50%': { boxShadow: '0 0 20px 8px rgba(4, 139, 154, 1)' }, // more lightning in middle
        },
      },
      animation: {
        blink: 'blink 3s infinite', 
        glowBlue: 'glowBlue 1.5s infinite',  
      },
    },
  },
  plugins: [],
};
export default config;
