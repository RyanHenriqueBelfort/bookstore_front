import { createContext, useState, useEffect, useContext } from 'react'
import { api } from '../../service/axios';

export const BookContext = createContext({})

export const BookProvider = ({ children }) => {
  const [book, setBook] = useState([]);
  const [gender, setGender] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    //Roda na quando na primeira execução da pagina
    api.get('/author')
      .then(response => setAuthor(response.data))

    api.get('/book')
      .then(response => setBook(response.data))

    api.get('/gender')
      .then(response => setGender(response.data))

    api.get('/publisher')
      .then(response => setPublisher(response.data))
  }, []);


  function destroy(id) {
    api.delete(`/book/${id}`)
    .then(() => setBook((prevBook => prevBook.filter((dados) => dados.id != id))))
    .catch((err) => console.error(err))
    // .then(() => api.get('/book')
    //  .then(response => setBook(response.data)))
  }

  return <BookContext.Provider value={{
    book,
    gender,
    publisher,
    author,
    setBook,
    destroy
  }}>
    {children}
  </BookContext.Provider>
}

export const useBook = () => useContext(BookContext)