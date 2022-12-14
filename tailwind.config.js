module.exports = {
  important: true,
  // purge: ["./src/**/*.js", "./src/**/**/*.js"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    extend: {
      colors: {
        [`background-search`]: 'rgb(51, 51, 51)',
        [`background`]: '#1B1B1B',
        [`text-color-primary`]: '#F5F5F5',
        [`text-color-secondary`]: '#995AFF',
        [`text-color-title`]: '#DEE4E9',
        [`text-color-description`]: '#81868E',
        [`btn-primary`]: '#995AFF',
        [`btn-primary-hover`]: '#AD7BFF',
      },
      height: {
        '280px': '280px',
        84: '336px',
        22: '88px',
        90: '360px',
        100: '400px',
        114: '460px',
        140: '520px',
        '11/12': '91.666667%',
        'max-content': 'max-content',
      },
      width: {
        22: '88px',
        84: '336px',
        114: '460px',
      },
      maxHeight: {
        'max-content': 'max-content',
        'max-avatar-user': '112px',
        'max-h-40': '160px',
      },
      maxWidth: {
        'max-avatar-user': '112px',
        56: '224px',
        'max-w-1/2': '50%',
        'max-w-1/3': '30%',
        'max-w-9/10': '90%',
        'max-w-114': '460px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
          sm: '2rem',
          md: '2.5rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '6rem',
        },
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
        16: '64px',
        22: '88px',
      },
      borderRadius: {
        '4xl': '32px',
      },
    },
  },
  plugins: [],
}
