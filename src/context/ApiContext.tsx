import React, { createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { Video } from '../types'

export const ApiContext = createContext()

const ApiContextProvider: React.FC = (props: any) => {
  return <ApiContext.Provider value={{}}>{props.children}</ApiContext.Provider>
}

export default withCookies(ApiContextProvider)
