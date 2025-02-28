type ColorDict = {
    [key: string]: string;
};
declare const TERM_COLORS: ColorDict;
declare const CSS_COLORS: ColorDict;
/** these are used for direct color output with console.log in node */
declare const ANSI_COLORS: {
    BLU: string;
    YEL: string;
    RED: string;
    DIM: string;
    BLD: string;
    NRM: string;
    BRI: string;
};
export { TERM_COLORS, CSS_COLORS, ANSI_COLORS };
declare const _default: {
    TERM_COLORS: ColorDict;
    CSS_COLORS: ColorDict;
    ANSI_COLORS: {
        BLU: string;
        YEL: string;
        RED: string;
        DIM: string;
        BLD: string;
        NRM: string;
        BRI: string;
    };
};
export default _default;
