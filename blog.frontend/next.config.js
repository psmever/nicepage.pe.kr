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
});
