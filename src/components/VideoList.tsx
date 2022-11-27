import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { ApiContext } from '../context/ApiContext'
import VideoItem from './VideoItem'

const VideoList: React.FC = () => {
  const { videos } = useContext(ApiContext)
  const videoList = videos.map((video) => (
    <VideoItem key={video.id} video={video} />
  ))

  return <Grid></Grid>
}

export default VideoList
