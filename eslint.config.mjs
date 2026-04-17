import nextVitals from 'eslint-config-next/core-web-vitals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextVitals,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
];
