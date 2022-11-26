import React, { createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { Video } from '../types'

export const ApiContext = createContext(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as {
    videos: Video[]
    setVideos: React.Dispatch<React.SetStateAction<Video[]>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    video: File
    setVideo: React.Dispatch<React.SetStateAction<File>>
    thum: File
    setThum: React.Dispatch<React.SetStateAction<File>>
    selectedVideo: Video
    setSelectedVideo: React.Dispatch<React.SetStateAction<Video>>
    modalIsOpen: boolean
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    createVideo: () => Promise<void>
    deleteVideo: () => Promise<void>
    incrementLike: () => Promise<void>
    incrementDisLike: () => Promise<void>
  }
)

const ApiContextProvider: React.FC = (props: any) => {
  const token = props.cookies.get('jwt-token') as string
  const [videos, setVideos] = useState<Video[]>([])
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState<File>(
    new File(['dummy'], 'dummy.txt', { type: 'text/plain' })
  )
  const [thum, setThum] = useState<File>(
    new File(['dummy'], 'dummy.txt', { type: 'text/plain' })
  )
  const [selectedVideo, setSelectedVideo] = useState<Video>({
    id: '',
    title: '',
    video: new File(['dummy'], 'dummy.txt', { type: 'text/plain' }),
    thum: new File(['dummy'], 'dummy.txt', { type: 'text/plain' }),
    like: 0,
    dislike: 0,
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    const getVideos = async (): Promise<void> => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/videos/', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        setVideos(res.data)
      } catch (err: any) {
        console.log(err.message)
      }
    }
    void getVideos()
  }, [token])

  const createVideo = async (): Promise<void> => {
    setModalIsOpen(true)
    const postData = {
      title,
      video: video.name,
      thum: thum.name,
    }
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/videos/',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      )
      setVideos([...videos, res.data])
      setTitle('')
      setVideo(new File(['dummy'], 'dummy.txt', { type: 'text/plain' }))
      setThum(new File(['dummy'], 'dummy.txt', { type: 'text/plain' }))
      setModalIsOpen(false)
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const deleteVideo = async (): Promise<void> => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      )
      setSelectedVideo({
        id: '',
        title: '',
        video: new File(['dummy'], 'dummy.txt', { type: 'text/plain' }),
        thum: new File(['dummy'], 'dummy.txt', { type: 'text/plain' }),
        like: 0,
        dislike: 0,
      })
      setVideos(videos.filter((video) => video.id !== selectedVideo.id))
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const incrementLike = async (): Promise<void> => {
    try {
      const patchData = {
        like: selectedVideo.like + 1,
      }
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
        patchData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      )
      setSelectedVideo({ ...selectedVideo, like: res.data.like })
      setVideos(
        videos.map((video) =>
          video.id === selectedVideo.id ? res.data : video
        )
      )
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const incrementDisLike = async (): Promise<void> => {
    try {
      const patchData = {
        dislike: selectedVideo.like - 1,
      }
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/videos/${selectedVideo.id}/`,
        patchData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      )
      setSelectedVideo({ ...selectedVideo, dislike: res.data.dislike })
      setVideos(
        videos.map((video) =>
          video.id === selectedVideo.id ? res.data : video
        )
      )
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return (
    <ApiContext.Provider
      value={{
        videos,
        setVideos,
        title,
        setTitle,
        video,
        setVideo,
        thum,
        setThum,
        selectedVideo,
        setSelectedVideo,
        modalIsOpen,
        setModalIsOpen,
        createVideo,
        deleteVideo,
        incrementLike,
        incrementDisLike,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export default withCookies(ApiContextProvider)
