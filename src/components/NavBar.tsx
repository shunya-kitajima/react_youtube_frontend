import React from 'react'
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

const NavBar: React.FC = () => {
  const classes = useStyles()

  return (
    <Appbar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Youtube App
        </Typography>
      </Toolbar>
    </Appbar>
  )
}

export default NavBar
