/// PRETTIER //////////////////////////////////////////////////////////////////
/*/- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\*\
    Handles formatting on save to enforce code style. Works in conjunction with
    ESLINT, which has to have its format-related rules disabled to not conflict
    with Prettier.
    https://prettier.io/docs/en/configuration.html
\*\- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - /*/
const config = {
  semi: true,
  printWidth: 86,
  singleQuote: true,
  quoteProps: "preserve",
  arrowParens: "avoid",
  trailingComma: "none",
};
export default config;
