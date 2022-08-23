/** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
// };

// ref: https://uiwjs.github.io/react-md-editor/#support-nextjs
const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  // webpack(config, options) {
  //     return config;
  // },
  experimental: {
    esmExternals: true,
    images: {
        unoptimized: true, // TODO : 이미지 로더 해결 필요. // https://doqtqu.tistory.com/343
        loader: 'akamai',
        domains: ["http://media.nicepage.pe.kr"],
      },
    },
});
