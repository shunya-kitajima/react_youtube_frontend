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
import { FaVideo } from 'react-icons/fa'
import { BsImages } from 'react-icons/bs'
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

  const handleSelectMovie = (): void => {
    const fileInput = document.getElementById('mp4Input')
    fileInput?.click()
  }

  const handleSelectThum = (): void => {
    const fileInput = document.getElementById('thumInput')
    fileInput?.click()
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
      >
        <Typography>Movie title</Typography>
        <TextField type="text" onChange={(e) => setTitle(e.target.value)} />
        <br />
        <br />
        <Container className={classes.container}>
          <input
            type="file"
            id="mp4Input"
            hidden
            onChange={(e) => {
              if (e.target.files != null) {
                setVideo(e.target.files[0])
              } else {
                setVideo(
                  new File(['dummy'], 'dummy.txt', { type: 'text/plain' })
                )
              }
            }}
          />
          <IconButton onClick={handleSelectMovie}>
            <FaVideo className="photo" />
          </IconButton>
          <input
            type="file"
            id="thumInput"
            hidden
            onChange={(e) => {
              if (e.target.files !== null) {
                setThum(e.target.files[0])
              } else {
                setThum(
                  new File(['dummy'], 'dummy.txt', { type: 'text/plain' })
                )
              }
            }}
          />
          <IconButton onClick={handleSelectThum}>
            <BsImages className="photo" />
          </IconButton>
          <br />
          {title !== '' &&
            video.name !== 'dummy.txt' &&
            thum.name !== 'dummy.txt' && (
              <button
                className="btn-modal"
                onClick={async () => await createVideo()}
              >
                <RiUploadCloud2Line />
              </button>
            )}
          <button className="btn-modal" onClick={() => setModalIsOpen(false)}>
            <IoMdClose />
          </button>
        </Container>
      </Modal>
    </>
  )
}

export default Main
