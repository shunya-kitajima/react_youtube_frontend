import React, { useContext } from 'react'
import Modal from 'react-modal'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { IoMdClose } from 'react-icons/io'
import { RiUploadCloud2Line } from 'react-icons/ri'
import { FaViadeo } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs'
import { ApiContext } from '../context/ApiContext'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
}))

const Main: React.FC = () => {
  const classes = useStyles()
  Modal.setAppElement('#root')
  const {
    title,
    setTitle,
    video,
    setVideo,
    thum,
    setThum,
    modalIsOpen,
    setModalIsOpen,
    createVideo,
  } = useContext(ApiContext)
  const customStyles = {
    content: {
      top: '30%',
      left: '43%',
      right: 'auto',
      bottom: 'auto',
    },
  }

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item xs={11}>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>
            <Grid item xs={1}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setModalIsOpen(true)}
              >
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail />
            </Grid>
            <Grid item xs={3}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      />
    </>
  )
}

export default Main
