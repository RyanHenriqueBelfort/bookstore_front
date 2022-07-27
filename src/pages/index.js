import { useState, useEffect, useContext } from "react"

import { Box, Tabs, TabList, Tab, TabPanel, TabPanels, TableContainer, Table, TableCaption, Thead, Td, Tr, Th, Tbody, Tfoot } from "@chakra-ui/react"
import { BookContext } from "../contexts/BookContext";


export default function Home() {
  const [book, setBook] = useState([]);
  const [gender, setGender] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [author, setAuthor] = useState([]);

  const ola = useContext(BookContext)

  console.log(ola)



  useEffect(() => {
    fetch('http://localhost:8000/api/book/')
      .then(data => data.json())
      .then(data => setBook(data))

    fetch('http://localhost:8000/api/gender/')
      .then(data => data.json())
      .then(data => setGender(data))

    fetch('http://localhost:8000/api/publisher/')
      .then(data => data.json())
      .then(data => setPublisher(data))

    fetch('http://localhost:8000/api/author/')
      .then(data => data.json())
      .then(data => setAuthor(data))
  }, []);

  return (
    <Box
      bg='gray.900'
      width='100vw'
      height='100vh'
      color={'gray.400'}
    >
      <Tabs isFitted variant='enclosed'
      >
        <TabList>
          <Tab
            fontSize='lg'
            color='gray.400'
            _selected={{
              background: 'gray.700',
              color: 'green.400'
            }}
          >Livros
          </Tab>
          <Tab
            fontSize='lg'
            color='gray.400'
            _selected={{
              background: 'gray.700',
              color: 'green.400'
            }}
          >Autores
          </Tab>

          <Tab
            fontSize='lg'
            color='gray.400'
            _selected={{
              background: 'gray.700',
              color: 'green.400'
            }}
          >Gênero
          </Tab>
          <Tab
            fontSize='lg'
            color='gray.400'
            _selected={{
              background: 'gray.700',
              color: 'green.400'
            }}
          >Editora
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table variant='striped' colorScheme=''>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Livro</Th>
                    <Th>Autor</Th>
                    <Th>Gênero</Th>
                    <Th>Editora</Th>
                    <Th isNumeric>Ano lançamento</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {book.map((dados) => (
                    <>
                      <Tr>
                        <Td>{dados.id}</Td>

                        <Td>{dados.title}</Td>

                        <Td>{author.map((e) => (
                          e.id === dados.id ? e.name : ''
                        ))}</Td>

                        <Td>{gender.map((e) => (
                          e.id === dados.id ? e.name : ''
                        ))}</Td>

                        <Td>{publisher.map((e) => (
                          e.id === dados.id ? e.name : ''
                        ))}</Td>

                        <Td isNumeric>{dados.release_year}</Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Box>
  )
}
