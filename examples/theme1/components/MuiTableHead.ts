import { themed } from '../themed';

export const MuiTableHead = themed(`MuiTableHead`, (theme) => ({
  styleOverrides: {
    root: {
      background:
        theme.palette.mode === `light`
          ? theme.palette.grey[100]
          : theme.palette.background.paper,

      textTransform: `uppercase`,

      '.MuiTableCell-root': {
        color: theme.palette.text.secondary,
      },
    },
  },
}));
