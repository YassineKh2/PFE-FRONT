// import {
//     value,
//     css
//   }
//   from './theme-helpers';

  export const colorsCommonDws = {
    transparent: 'transparent',
    jet: '#333333',
    lightGrey: '#B2BEC0',
    whiteO80: 'rgba(255, 255, 255, 0.8)',
    lineColor: 'rgba(137, 150, 160, 0.3)',
    paleGrey: '#E0E6E6',
    paleGreyO30: 'rgba(224, 230, 230, 0.3)',
    midGrey: '#8996A0',
    midGreyO30: 'rgba(137, 150, 160, 0.3)',
    midGreyO80: 'rgba(137, 150, 160, 0.8)',
    logoGrey: '#7D8A98',
    darkGrey: '#6E7878',
    darkGreyText: '#62707a',
    darkGreyO30: 'rgba(110, 120, 120, 0.3)',
    ragRed: '#E00034',
    ragAmber: '#E2C034',
    darkBlue: '#315989',
    darkBlue20B: '#27476D',
    darkBlue35W: '#7892B2',
    darkBlue55W: '#A2B4C9',
    darkBlue75W: '#CCD5E1',
    warmGrey: '#978371',
    warmGrey20B: '#78685A',
    warmGrey35W: '#B1A294',
    warmGrey55W: '#D0C7BE',
    warmGrey75W: '#E4DFDB',
    petrol: '#009DA2',
    petrolDark: '#00777B',
    petrolLight: '#40B6B9',
    brightBlue: '#02A2E0',
    brightBlue20B: '#0181B3',
    brightBlue35W: '#41B9E7',
    brightBlue55W: '#8CD5F1',
    brightBlue75W: '#BFE7F7',
    green: '#7AB800',
    green20B: '#629E1F',
    green35W: '#9CD45D',
    green55W: '#C3E59D',
    green75W: '#DDF0C8',
    purple: '#7938A3',
    purple20B: '#703C8E',
    purple35W: '#A878C5',
    purple55W: '#CBAEDC',
    purple75W: '#E2D2EB',
    pink: '#D71F85',
    pink20B: '#B22762',
    pink35W: '#E7649C',
    pink55W: '#F0A2C3',
    pink75W: '#F6CBDD',
  };
  const NEW_BRAND = {
    black: '#080808',
    vibrantRed: '#fc3c61',
    vibrantRedLight: '#ff5273',
    vibrantRedDark: '#c02e4a',
    berry: '#720342',
    berryLight: '#ac6a90',
    semanticRed: '#eb1b00',
    semanticGreen: '#519c4a',
    semanticGreenLight: '#aad571',
    white: '#ffffff',
  };
  const NEW_BRAND_CHART_COLOURS = {
    orange: '#fd9154',
    orangeLight: '#ffb489',
    deepBlue: '#43728d',
    lightBlue: '#86b6c2',
    lightVibrantRed: '#fd7790',
  };
  const SHADES_OF_GREY = {
    //ordered from light to dark 
    grey1: '#f4f6fa',
    grey2: '#c8cedc',
    grey3: '#b6b8c3',
    grey4: '#686b8a',
    grey5: '#3d3f53',
  };
  const SHADES_OF_BLUE = {
    lightBlue2: '#4c91a1',
    lightBlue3: '#308099',
    deepBlue2: '#275f7f',
    deepBlue3: '#0c4769',
  };
  const SHADES_OF_GREEN = {
    green1: '#67BE8A',
    green2: '#157849',
  };
  const componentColors = {
    chevronColor: SHADES_OF_GREY.grey5,
    dropdownCheckColor: NEW_BRAND.berry,
    dropdownCloseColor: NEW_BRAND.vibrantRed,
  };
  export const colorsCommon = {...colorsCommonDws,
    ...NEW_BRAND,
    ...NEW_BRAND_CHART_COLOURS,
    ...SHADES_OF_GREY,
    ...SHADES_OF_GREEN,
    ...SHADES_OF_BLUE,
    ...componentColors,
  }
  export const colorsDefault = {
    primaryColor: colorsCommon.berry,
    backgroundColor: colorsCommon.vibrantRed,
    primaryTextColor: colorsCommon.grey5,
    secondaryTextColor: colorsCommon.grey5,
    disabledTextColor: colorsCommon.grey2,
    disabledIconColor: colorsCommon.grey5,
    disabledActiveTextColor: colorsCommon.grey2,
    formInputError: colorsCommon.semanticRed,
    successColor: colorsCommon.semanticGreen,
  };
  const colorsInverse = {
    primaryColor: colorsCommon.berry,
    backgroundColor: colorsCommon.white,
    primaryTextColor: colorsCommon.grey5,
    secondaryTextColor: colorsCommon.grey5,
    disabledTextColor: colorsCommon.grey2,
    disabledIconColor: colorsCommon.grey5,
    disabledActiveTextColor: colorsCommon.grey2,
  };
  // const values = {
  //   fontSize1: value(32, 'px'),
  //   fontSize2: value(24, 'px'),
  //   fontSize2_5: value(22, 'px'),
  //   fontSize3: value(20, 'px'),
  //   fontSize4: value(16, 'px'),
  //   fontSize5: value(14, 'px'),
  //   fontSize6: value(12, 'px'),
  //   fontSize7: value(12, 'px'),
  //   lineHeight22px: value(22, 'px'),
  // };
  const themeMorgenFund = {
    colors: {
    default:
      colorsDefault,
      inverse: colorsInverse,
      common: colorsCommon,
    },
    // values,
    fontFaces: [{
      fontFamily: 'Morgenfund Objektiv Mk1',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: `url( & quot; fonts / morgenfund / ObjektivMk1_W_Rg.woff2 & quot;) format( & quot; woff2 & quot;),
      url( & quot; fonts / morgenfund / ObjektivMk1_W_Rg.woff & quot;) format( & quot; woff & quot;)`,
    },
    {
      fontFamily: 'Morgenfund Objektiv Mk1',
      fontStyle: 'normal',
      fontWeight: 500,
      src: `url( & quot; fonts / morgenfund / ObjektivMk1_W_Md.woff2 & quot;) format( & quot; woff2 & quot;),
      url( & quot; fonts / morgenfund / ObjektivMk1_W_Md.woff & quot;) format( & quot; woff & quot;)`,
    },
    {
      fontFamily: 'Morgenfund Objektiv Mk1',
      fontStyle: 'normal',
      fontWeight: 'bold',
      src: `url( & quot; fonts / morgenfund / ObjektivMk1_W_Bd.woff2 & quot;) format( & quot; woff2 & quot;),
      url( & quot; fonts / morgenfund / ObjektivMk1_W_Bd.woff & quot;) format( & quot; woff & quot;)`,
    },
    {
      fontFamily: 'Morgenfund Objektiv Mk2',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: `url( & quot; fonts / morgenfund / ObjektivMk2_W_Rg.woff2 & quot;) format( & quot; woff2 & quot;),
      url( & quot; fonts / morgenfund / ObjektivMk2_W_Rg.woff & quot;) format( & quot; woff & quot;)`,
    },
    {
      fontFamily: 'Morgenfund Objektiv Mk2',
      fontStyle: 'normal',
      fontWeight: 500,
      src: `url( & quot; fonts / morgenfund / ObjektivMk2_W_Md.woff2 & quot;) format( & quot; woff2 & quot;),
      url( & quot; fonts / morgenfund / ObjektivMk2_W_Md.woff & quot;) format( & quot; woff & quot;)`,
    },
    {
      fontFamily: 'Morgenfund Objektiv Mk2',
      fontStyle: 'normal',
      fontWeight: 'bold',
      src: `url( & quot; fonts / morgenfund / ObjektivMk2_W_Bd.woff2 & quot;) format( & quot; woff2 & quot;),
      url( & quot; fonts / morgenfund / ObjektivMk2_W_Bd.woff & quot;) format( & quot; woff & quot;)`,
    },
    ],
    // globals: {
    //   web: [`html {
    //     font - size: $ {
    //       values.fontSize5
    //     };
    //     box - sizing: border - box;
    //   }`, ` * , *::before, *::after {
    //     box - sizing: inherit;
    //   }`, `body {
    //     padding: 0;
    //     line - height: 1.5;
    //   }`, `html, body, button, input, select, textarea, optgroup {
    //     font - family: 'Morgenfund Objektiv Mk2',
    //     Arial,
    //     sans - serif ! important;
    //   }`, `h1, h2, h3, h4, h5, h6 {
    //     font - family: 'Morgenfund Objektiv Mk1';
    //     font - weight: bold;
    //   }`, `h1 {
    //     font - size: $ {
    //       values.fontSize1
    //     }
    //   }`, `h2 {
    //     font - size: $ {
    //       values.fontSize2
    //     }
    //   }`, `h3 {
    //     font - size: $ {
    //       values.fontSize3
    //     }
    //   }`, `h4 {
    //     font - size: $ {
    //       values.fontSize4
    //     }
    //   }`, `h5 {
    //     font - size: $ {
    //       values.fontSize5
    //     }
    //   }`, `h6 {
    //     font - size: $ {
    //       values.fontSize6
    //     }
    //   }`, `small {
    //     font - size: $ {
    //       values.fontSize7
    //     }
    //   }`, `a: hover {
    //     color: $ {
    //       colorsCommon.berryLight
    //     };
    //     text - decoration: underline;
    //   }`, `a: visited span {
    //     color: $ {
    //       colorsCommon.berryLight
    //     };
    //   }`, `a: active span {
    //     color: $ {
    //       colorsCommon.berry
    //     };
    //     text - decoration: underline;
    //   }`, `.modal__container {
    //     background - color: white;
    //     border - radius: 10px
    //   }`, `.text--primary {
    //     color: $ {
    //       colorsCommon.deepBlue
    //     };
    //   }`, `.text--secondary {
    //     color: $ {
    //       colorsCommon.grey5
    //     };
    //   }`, `.popover {
    //     border: 1px solid#b1b7be;
    //     transition: opacity.33s
    //   }`, ],
    //   native: [],
    // },
    // helpers: {
    //   css,
    //   value,
    // },
  };
  export
  default themeMorgenFund;