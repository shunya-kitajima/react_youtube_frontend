import React from 'react'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import NavBar from './components/NavBar'
import './App.css'

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
    <MuiThemeProvider theme={theme}>
      <NavBar>main</NavBar>
    </MuiThemeProvider>
  )
}

export default App
