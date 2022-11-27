import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { ApiContext } from '../context/ApiContext'
import { Video } from '../types'

export interface Props {
  video: Video
}

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 15,
  },
  cardcont: {
    padding: theme.spacing(1),
  },
}))

const VideoItem: React.FC<Props> = ({ video }) => {
  const classes = useStyles()
  const { setSelectedVideo } = useContext(ApiContext)

  return (
    <Card className={classes.card} onClick={() => setSelectedVideo(video)}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="thumnail"
          height="200"
          image={video.thum.name}
        >
          <CardContent className={classes.cardcont}>
            <Typography variant="h6">{video.title}</Typography>
          </CardContent>
        </CardMedia>
      </CardActionArea>
    </Card>
  )
}

export default VideoItem
