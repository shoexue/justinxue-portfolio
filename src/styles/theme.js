import { hex2rgba } from '@utils';

const ACCENT = '#8FFF5A';
const DARK_BG = '#101010';
const BG = '#161616';
const TRANSLUCENT_BG = '#1f1f1f';

const theme = {
  colors: {
    darkBg: DARK_BG,
    bg: BG,
    lightGray: TRANSLUCENT_BG,
    lightestGray: '#343434',
    slate: '#B2BBD3',
    lightSlate: '#D0D5E1',
    lightestSlate: '#E7F0F7',
    white: '#EDFAFF',
    green: ACCENT,
    transGreen: hex2rgba(ACCENT, 0.07),
    transWhite: hex2rgba('#EDFAFF', 0.9),
    transLightGray: hex2rgba(TRANSLUCENT_BG, 0.9),
    transLightestGray: hex2rgba('#343434', 0.9),
    shadowbg: hex2rgba(DARK_BG, 0.7),
    transbg: hex2rgba(TRANSLUCENT_BG, 0.95),
  },

  fonts: {
    Calibre: 'Poppins, sans-serif',
    SFMono: 'Source Code Pro, monospace',
  },

  fontSizes: {
    xs: '12px',
    smish: '13px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '22px',
    h3: '32px',
  },

  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

  borderRadius: '3px',
  navHeight: '100px',
  navScrollHeight: '70px',
  margin: '20px',

  tabHeight: 42,
  tabWidth: 120,
  radius: 3,

  hamburgerWidth: 30,
  hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
  hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
  hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,

  navDelay: 1000,
  loaderDelay: 2000,
};

export default theme;
