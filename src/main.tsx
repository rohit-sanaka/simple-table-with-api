import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { formLabelsTheme } from './MuiTheme/MuiTheme.ts'
import { ThemeProvider } from '@mui/material'
const queryClient = new QueryClient()
//   {
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       // refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 5 * 60 * 1000,
//     },
//   },
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={formLabelsTheme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools position='bottom-left' />
    </QueryClientProvider>
  </React.StrictMode>
)
