import React from 'react'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import NavBar from './components/NavBar'
import ApiContextProvider from './context/ApiContext'
import './App.css'
import Main from './components/Main'

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Comic Neue", crusive',
  },
})

const App: React.FC = () => {
  return (
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <Main />
      </MuiThemeProvider>
    </ApiContextProvider>
  )
}

export default App
