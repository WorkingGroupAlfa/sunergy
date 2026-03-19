import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink:'#091A33', graphite:'#243246', steel:'#5E6C82', frost:'#EEF3F8', line:'#D8E2EE', accent:'#2D4D7A' },
      boxShadow: { soft:'0 12px 60px rgba(9,26,51,.08)', panel:'0 16px 40px rgba(9,26,51,.12)' },
      backgroundImage: { 'grid-fade':'radial-gradient(circle at top, rgba(89,112,145,0.18), transparent 50%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)' }
    }
  },
  plugins: []
};
export default config;
