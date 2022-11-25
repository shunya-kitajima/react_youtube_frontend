import React from 'react'
import { withCookies } from 'react-cookie'
import { makeStyles } from '@material-ui/core'
import Appbar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { FiLogOut } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}))

const NavBar: React.FC = (props: any) => {
  const classes = useStyles()

  const logout = (): void => {
    props.cookies.remove('jwt-token')
    window.location.href = '/'
  }

  return (
    <Appbar position="static">
      <Toolbar>
        <button className="logo">
          <FaYoutube />
        </button>
        <Typography variant="h5" className={classes.title}>
          Youtube App
        </Typography>
        <button className="logOut" onClick={() => logout()}>
          <FiLogOut />
        </button>
      </Toolbar>
    </Appbar>
  )
}

export default withCookies(NavBar)
