import { useContext, useRef, useState } from "react"
import { BookContext } from "../../contexts/BookContext";
import { useRouter } from "next/router"

import {
  Td,
  Tr,
  Tbody,
  Stack,
  Box,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  SkeletonCircle,
  SkeletonText
} from "@chakra-ui/react"

import { ButtonTable } from "../table/ButtonTable";

export function Book() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [selectBook, setSelectBook] = useState()
  const router = useRouter()

  const { book, author, gender, publisher, destroyBook } = useContext(BookContext)

  function handleClick(id) {
    setSelectBook(id)
    onOpen()
  }


  function handleDelete() {
    destroyBook(selectBook)
    onClose()
  }

  return (
    <Tbody
      color='gray.300'
    >
      {book.map((dados) => (
        <Tr key={dados.id}>
          <Td>{dados.id}</Td>

          <Td>{dados.title}</Td>

          <Td>{author.map((e) => (
            e.id == dados.author_id ? e.name : ''
          ))}</Td>

          <Td>{gender.map((e) => (
            e.id == dados.gender_id ? e.name : ''
          ))}</Td>

          <Td>{publisher.map((e) => (
            e.id == dados.publisher_id ? e.name : ''
          ))}</Td>
          <Td isNumeric>{dados.release_year}</Td>

          <Td>
            <Stack direction='row' spacing={5}>
              <ButtonTable colorScheme="linkedin" onClick={() => router.push(`/edit/book/${dados.id}`)}>
                Editar
              </ButtonTable>

              <ButtonTable colorScheme="red" onClick={() => handleClick(dados.id)}>
                Excluir
              </ButtonTable>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                blockScrollOnMount
              >
                <AlertDialogOverlay
                  bg='#0b0b0b15'
                >
                  <AlertDialogContent >
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Deletar Livro
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Voce tem certeza? Você não pode desfazer essa ação depois.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose} bg='gray.300'>
                        Voltar
                      </Button>
                      <Button colorScheme='red' onClick={() => handleDelete()} ml={3}>
                        Excluir
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Stack>
          </Td>
        </Tr>
      ))}
    </Tbody>
  )
}