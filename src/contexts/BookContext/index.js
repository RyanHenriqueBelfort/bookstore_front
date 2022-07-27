import { createContext } from 'react'

export const BookContext = createContext({})

export const BookProvider = ({children}) => {
  const ola = 'Ola mundo'
  return <BookContext.Provider value={ola}>{children}</BookContext.Provider>
}