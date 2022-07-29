import {useContext } from "react"
import { BookContext } from "../contexts/BookContext";

import { Box, Tabs, TabList, Tab, TabPanel, TabPanels, TableContainer, Table, TableCaption, Thead, Td, Tr, Th, Tbody, Tfoot } from "@chakra-ui/react"
import { Book } from "../components/table/Book";
import { Aba } from "../components/table/Aba";
import { ButtonTable } from "../components/table/ButtonTable";
import Link from "next/link";


export default function Home() {
  

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
          <Aba>Livros</Aba>
          <Aba>Autores</Aba>
          <Aba>Gênero</Aba>
          <Aba>Editora</Aba>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table variant='striped' colorScheme=''>
                <Thead>
                  <Tr>
                    <Th color='gray.100'>Id</Th>
                    <Th color='gray.100'>Livro</Th>
                    <Th color='gray.100'>Autor</Th>
                    <Th color='gray.100'>Gênero</Th>
                    <Th color='gray.100'>Editora</Th>
                    <Th isNumeric color='gray.100'>Ano lançamento</Th>
                    <Th>
                      <Link href='/create/book'>
                        <a>
                          <ButtonTable colorScheme='green' size='md'>Novo</ButtonTable>
                        </a>
                      </Link>
                    </Th>
                  </Tr>
                </Thead>
                
                {/* Component dos Livros */}
                <Book />


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
