import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { deepPurple, pink, red, teal } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary:
      teal,

    secondary: pink,
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;