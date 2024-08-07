module.exports = {
  siteTitle: 'Alvina Yang',
  siteDescription: 'A student at the University of Toronto who can sometimes code :)',
  siteKeywords: 'Alvina Yang, Alvina',
  siteUrl: 'https://alvinayang.com/',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-45666519-2',
  googleVerification: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk',
  name: 'Alvina Yang',
  location: 'Toronto, Ontario, Canada',
  email: 'alvina.yang@mail.utoronto.ca',
  github: 'https://github.com/alvina-yang',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/alvina-yang',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/alvina-y-1a823922b/',
    },
  ],

  navLinks: [
    {
      name: 'about ()',
      url: '/#about',
    },
    {
      name: 'experiences ()',
      url: '/#jobs',
    },
    {
      name: 'education ()',
      url: '/#education',
    },
    {
      name: 'projects ()',
      url: '/#projects',
    },
    {
      name: 'contact ()',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#64ffda',
    bg: '#0a192f',
    darkBg: '#020c1b',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
