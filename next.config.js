const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: { version },
  // i18n: {
  //   defaultLocale: "en-US",
  //   locales: ["en-US", "en", "es-MX", "es"],
  // },
};

module.exports = nextConfig;
