import { createTheme, PaletteColorOptions } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
          main: '#19857b'
        },
        error: {
          main: red.A400,
          dark: blue[200],
        },
      },
      components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148c',
                },
            }
        },
      }
});