import { createTheme } from '@mui/material/styles'

export const MuiCustomTheme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'grey',
          fontFamily: 'Roboto',
          fontWeight: 400,
          fontSize: '1.2rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'black',
          fontFamily: 'Monospace',
          fontWeight: 200,
          fontSize: '1.2rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
})
