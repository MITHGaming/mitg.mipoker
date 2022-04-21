const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: false,
  optimizeFonts: true,
  pwa: {
    dest: 'public',
    register: false,
    skipWaiting: true,
    disable: true,
  },
});
