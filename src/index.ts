// https://github.com/cucumber/cucumber-js/issues/1152
// import prettgyJs  from 'pretty-js'

// Need to load with require because it has no corresponding type declarations
const prettyJs = require("pretty-js");

export const bridge = async (code: string, data: any) => {
  code = code
    .replace(/[\r\n\s]+{/g, "{")
    .replace(/if[\r\n\s]+[(]/g, "if(")
    .replace(/"/g, `'`);

  code = prettyJs(code);
};
