import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CycleProvider } from './contexts/CycleContext'

import { Router } from './Router'
import { GlobalStyles } from './styles/global'
import { theme } from './styles/theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CycleProvider>
        <BrowserRouter>
          <GlobalStyles />

          <Router />
        </BrowserRouter>
      </CycleProvider>
    </ThemeProvider>
  )
}
