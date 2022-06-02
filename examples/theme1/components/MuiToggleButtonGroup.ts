import { themed } from '../themed';

export const MuiToggleButtonGroup = themed(`MuiToggleButtonGroup`, {
  styleOverrides: {
    root: {
      gap: `1rem`,
      '.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
      '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
        borderLeft: `1px solid #438AFF`,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
    },
  },
});
