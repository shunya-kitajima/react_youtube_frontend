import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'
import { ApiContext } from '../context/ApiContext'
import { Video } from '../types'

const useStyles = makeStyles((theme) => ({
  title: {
    paddingLeft: theme.spacing(2),
  },
  delete: {
    margin: theme.spacing(2),
  },
  like: {
    paddingTop: theme.spacing(3),
  },
}))

export interface Props {
  video: Video
}

const VideoDetail: React.FC = () => {
  const classes = useStyles()
  const { selectedVideo, deleteVideo, incrementLike, incrementDisLike } =
    useContext(ApiContext)

  return <div></div>
}

export default VideoDetail
