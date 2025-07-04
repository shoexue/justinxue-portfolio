'use client'

const config = {
  siteTitle: 'Justin Xue',
  siteDescription: 'A student at McGill University who can sometimes code :)',
  siteKeywords: 'Justin Xue, Justin',
  siteUrl: 'https://justinxue.dev/',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-45666519-2',
  googleVerification: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk',
  name: 'Justin Xue',
  location: 'Toronto, Ontario, Canada',
  email: 'justin.xue@mail.mcgill.ca',
  github: 'https://github.com/shoexue',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/shoexue',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/justin-xue5/',
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
    // {
    //   name: 'library ()',
    //   url: '/#library',
    // },
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
}

export default config 