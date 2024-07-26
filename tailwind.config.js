/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Noto Sans KR"', 'sans-serif'],
      },
      colors: {
        'primary': '#212121',
        'secondary': '#e7eaef',
        'accent': '#bcbcbc',
        'hover': '#ffed4a',
        'button': {
          'blue': {
            'DEFAULT': '#3182ce',
            'hover': '#63b3ed',
          },
          'yellow': {
            'DEFAULT': '#ecc94b',
            'hover': '#faf089',
          },
        },
      },
      boxShadow: {
        'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      borderRadius: {
        'lg': '8px',
      },
      spacing: {
        '44': '11rem',
      },
      placeholderColor: {
        'secondary': '#bcbcbc',
      },
    },
  },
  plugins: [],
  important: true,
}
