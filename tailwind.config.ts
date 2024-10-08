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
       secondaryLight: '#bbd7dc',
       win98blue1: '#004a99',
        win98blue2: '#0078d7',
        win98blue3: '#4facfe',
      },
      keyframes: {
        virus: {
          '0%, 100%': {scale: '0.5'},
          '50%': {scale: '1.5'}
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glowBlue: {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(4, 139, 154, 0.8)' }, // 
          '50%': { boxShadow: '0 0 20px 8px rgba(4, 139, 154, 1)' }, // more lightning in middle
        },
        typewriter: {
          '0%': { width: '0ch' }, 
          '70%': { width: '37ch' }, 
          '90%': { width: '37ch' }, 
          '100%': { width: '0ch' },
        },
        cursor: {
          '0%, 100%': { borderColor: 'transparent' }, 
          '50%': { borderColor: '#048b9a' }, 
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          }
        },
      },
      animation: {
        blink: 'blink 3s infinite', 
        glowBlue: 'glowBlue 1.5s infinite',
        typewriter: 'typewriter 5s steps(37, end) 1s infinite ',
        cursor: 'blink 1s steps(2, start) infinite',
        bounce: 'bounce 1s infinite',
        virus: 'virus 3s infinite'
      },
    },
  },
  plugins: [],
};
export default config;
