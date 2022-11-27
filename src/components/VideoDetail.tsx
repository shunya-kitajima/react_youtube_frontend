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

export interface Props {
  video: Video
}

const VideoDetail: React.FC = () => {
  const {} = useContext(ApiContext)

  return <div></div>
}

export default VideoDetail
