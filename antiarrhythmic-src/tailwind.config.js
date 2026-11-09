module.exports = {
  content: [
    __dirname + '/app.jsx',
    __dirname + '/tools.jsx',
    __dirname + '/data.js',
    __dirname + '/shell.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'IBM Plex Sans Thai', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
};
