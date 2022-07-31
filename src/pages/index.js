import { useContext } from "react"
import { BookContext } from "../contexts/BookContext";
import { Box, Tabs, TabList, TabPanel, TabPanels, Stack, Skeleton, SkeletonText } from "@chakra-ui/react"
import { Book } from "../components/book/Book";
import { Aba } from "../components/table/Aba";
import { TableBook } from "../components/book/TableBook";
import { TableAuthor } from "../components/author/TableAuthor";
import { TableGender } from "../components/gender/TableGender";
import { TablePublisher } from "../components/publisher/TablePublisher";

export default function Home() {
  const { book } = useContext(BookContext)
  return (
    <Box
      bg='gray.900'
      minHeight='100vh'
      maxWidth='100vw'
      color={'gray.400'}
    >
      <Tabs isFitted variant='enclosed'>
        <TabList>
          <Aba>Livro</Aba>
          <Aba>Autor</Aba>
          <Aba>Gênero</Aba>
          <Aba>Editora</Aba>
        </TabList>
        <TabPanels>
          <TabPanel>
            {book[0]
              ?
              <TableBook />
              :
              <Box padding='6' boxShadow='lg'>
                  <Skeleton height='30px'/>
                <Stack spacing={8}>
                  <Skeleton height='15px' mb='30px'/>
                  <Skeleton height='15px' mb='30px'/>
                  <Skeleton height='15px' mb='30px'/>
                  <Skeleton height='15px' mb='30px'/>
                  <Skeleton height='15px' mb='30px'/>
                  <Skeleton height='15px' mb='30px'/>
                </Stack>
              </Box>
            }
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
