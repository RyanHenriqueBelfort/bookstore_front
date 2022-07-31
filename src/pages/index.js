import { useContext } from "react"
import { BookContext } from "../contexts/BookContext";

import { Box, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react"
import { Book } from "../components/book/Book";
import { Aba } from "../components/table/Aba";
import { TableBook } from "../components/book/TableBook";
import { TableAuthor } from "../components/author/TableAuthor";
import { TableGender } from "../components/gender/TableGender";
import { TablePublisher } from "../components/publisher/TablePublisher";

export default function Home() {

  return (
    <Box
      bg='gray.900'
      minHeight='100vh'
      maxWidth='100vw'
      color={'gray.400'}
    >
      <Tabs isFitted variant='enclosed'>
        <TabList>
          <Aba>Livros</Aba>
          <Aba>Autores</Aba>
          <Aba>Gênero</Aba>
          <Aba>Editora</Aba>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableBook />
          </TabPanel>
          <TabPanel>
            <TableAuthor />
          </TabPanel>
          <TabPanel>
            <TableGender />
          </TabPanel>
          <TabPanel>
            <TablePublisher />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
