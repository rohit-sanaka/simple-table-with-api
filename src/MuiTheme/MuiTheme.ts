import { createTheme } from '@mui/material/styles'

export const formLabelsTheme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
  },
})
