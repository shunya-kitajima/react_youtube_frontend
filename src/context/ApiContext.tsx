import React, { createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { Video } from '../types'

export const ApiContext = createContext()

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

  return <ApiContext.Provider value={{}}>{props.children}</ApiContext.Provider>
}

export default withCookies(ApiContextProvider)
