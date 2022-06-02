import { ThemeBuilder } from './ThemeBuilder';
import ComponentOverrides from './components';

const themer = new ThemeBuilder({
  typography: {
    fontFamily: `Poppins`,
  },
  shadows: [`0px 2px 6px #0000000A`, `0px 2px 6px #0000000A`],
});

themer.setDarkColors({
  primary: {
    main: `#83b9ff`,
  },
  secondary: {
    main: `#a8ff7d`,
  },
  background: {
    default: `#1e1e2f`,
    gradient: `linear-gradient(#1e1e2f, #1e1e24)`,
    paper: `#27293d`,
  } as any,
});

themer.setLightColors({
  primary: {
    main: `#438AFF`,
    contrastText: `#FFFFFF`,
  },

  grey: {
    100: `#F5F6FA`,
  },

  secondary: {
    main: `#70F649`,
    contrastText: `#000000`,
  },
  background: {
    default: `#F0F0F7`,
    paper: `#FFFFFF`,
  },
});

themer.setComponents(...ComponentOverrides);

const { light, dark } = themer.build();

export { light, dark, themer };
