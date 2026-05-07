export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sumi: '#1A1A1A',
        noukai: '#666666',
        chukai: '#999999',
        tankai: '#DDDDDD',
        kinari: '#FAFAF5',
        flag: '#8B1E1E',
        ship: '#00C8FF',
        lab: '#00FF7F',
      },
      fontFamily: {
        mincho: ['Shippori Mincho', 'serif'],
        noto: ['Noto Serif JP', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
