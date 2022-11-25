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

  return <ApiContext.Provider value={{}}>{props.children}</ApiContext.Provider>
}

export default withCookies(ApiContextProvider)
