import { createContext, useState, useEffect, useContext } from 'react'
import { api } from '../../service/axios';

export const BookContext = createContext({})

export const BookProvider = ({ children }) => {
  const [book, setBook] = useState([]);
  const [gender, setGender] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    //Roda na primeira execução da pagina
    api.get('/author')
      .then(response => setAuthor(response.data))

    api.get('/book')
      .then(response => setBook(response.data))

    api.get('/gender')
      .then(response => setGender(response.data))

    api.get('/publisher')
      .then(response => setPublisher(response.data))
  }, []);


  function destroyBook(id) {
    api.delete(`/book/${id}`)
    .then(() => api.get('/book')
    .then(response => setBook(response.data)))
    .catch((err) => console.error(err))
  }
  function destroyGender(id) {
    api.delete(`/gender/${id}`)
    .then(() =>  api.get('/gender')
    .then(response => setGender(response.data)))
    .catch((err) => console.error(err.response))
  }
  function destroyAuthor(id) {
    api.delete(`/author/${id}`)
    .then(() => setAuthor((prevBook => prevBook.filter((dados) => dados.id != id))))
    .catch((err) => console.error(err))
  }
  function destroyPublisher(id) {
    api.delete(`/publisher/${id}`)
    .then(() => api.get('/publisher')
    .then(response => setPublisher(response.data)))
    .catch((err) => console.error(err))
  }

  return <BookContext.Provider value={{
    book,
    gender,
    publisher,
    author,
    destroyBook,
    destroyGender,
    destroyAuthor,
    destroyPublisher,
    setBook,
    setGender,
    setAuthor,
    setPublisher
  }}>
    {children}
  </BookContext.Provider>
}

export const useBook = () => useContext(BookContext)