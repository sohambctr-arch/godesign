/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // Tailwind v4 PostCSS plugin.
    // Processes @theme {}, @layer, @custom-variant,
    // and all Tailwind utility classes.
    "@tailwindcss/postcss": {},
  },
};