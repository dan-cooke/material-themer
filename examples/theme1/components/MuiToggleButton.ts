import { themed } from '../themed';

export const MuiToggleButton = themed(`MuiToggleButton`, (theme) => ({
  styleOverrides: {
    root: {
      borderRadius: 4,
      paddingTop: 4,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 4,
      textTransform: `initial`,
      border: `1px solid ${theme.palette?.primary.main}`,
      color: `${theme.palette.primary.main}`,
    },
  },
}));
