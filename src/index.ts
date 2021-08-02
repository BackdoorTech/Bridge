// import prettyJs from "pretty-js";

export const bridge = async (code: string, data: any) => {
  code = code
    .replace(/[\r\n\s]+{/g, "{")
    .replace(/if[\r\n\s]+[(]/g, "if(")
    .replace(/[\s]+ =/g, " =")
    .replace(/= [\s]+/g, "= ")
    .replace(/"/g, `'`);

  // code = prettyJs(code);
};
