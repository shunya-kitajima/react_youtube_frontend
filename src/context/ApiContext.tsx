import React, { createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { Video } from '../types'

export const ApiContext = createContext()

const ApiContextProvider: React.FC = (props: any) => {
  const token = props.cookies.get('jwt-token') as string
  const [videos, setVideos] = useState<Video[]>([])
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState(null)
  const [thum, setThum] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return <ApiContext.Provider value={{}}>{props.children}</ApiContext.Provider>
}

export default withCookies(ApiContextProvider)
