import { createTheme } from '@mui/material';

const awaIndigo = '#0083a8';
const narutoBridge = '#ebeef4';
const pathOfVortex = '#47787f';
const middlePathOfVortex = '#47787f4d';
const darkPathOfVortex = '#243c3f';

const theme = createTheme({
  palette: {
    background: {
      default: pathOfVortex,
      paper: darkPathOfVortex,
    },
    primary: {
      main: awaIndigo,
      contrastText: narutoBridge,
    },
    text: {
      primary: narutoBridge,
    },
    customWhite: {
      main: narutoBridge,
    },
  },
  typography: {
    fontFamily: ['Nunito', 'Helvetica', 'Arial', `sans-serif`].join(','),
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'monospaced' },
          style: {
            fontFamily: 'Monospace',
          },
        },
      ],
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: middlePathOfVortex,
          },
        },
      },
    },
  },
});

export default theme;
