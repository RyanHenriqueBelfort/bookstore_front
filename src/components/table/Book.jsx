import { useContext } from "react"
import { BookContext } from "../../contexts/BookContext";

import { Td, Tr, Tbody, Stack } from "@chakra-ui/react"
import { ButtonTable } from "./ButtonTable";



export function Book() {

  const { book, author, gender, publisher } = useContext(BookContext)

  return (
    <Tbody
      color='gray.300'
    >
      {book.map((dados) => (
        <>
          <Tr>
            <Td>{dados.id}</Td>

            <Td>{dados.title}</Td>

            <Td>{author.map((e) => (
              e.id === dados.author_id ? e.name : ''
            ))}</Td>

            <Td>{gender.map((e) => (
              e.id === dados.gender_id ? e.name : ''
            ))}</Td>

            <Td>{publisher.map((e) => (
              e.id === dados.publisher_id ? e.name : ''
            ))}</Td>
            <Td isNumeric>{dados.release_year}</Td>

            <Td>
              <Stack direction='row' spacing={5}>
                <ButtonTable colorScheme="linkedin">
                  Editar
                </ButtonTable> 
                <ButtonTable colorScheme="red">
                  Excluir
                </ButtonTable> 
              </Stack>
            </Td>
          </Tr>

        </>
      ))}
    </Tbody>
  )
}