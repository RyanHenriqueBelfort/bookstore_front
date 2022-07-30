import { useContext, useRef, useState, useEffect } from "react"
import { BookContext } from "../../contexts/BookContext";
import { useRouter } from "next/router"

import {
  Td,
  Tr,
  Tbody,
  Stack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"

import { ButtonTable } from "../table/ButtonTable";

export function Author() {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [selectBook, setSelectBook] = useState()
  const router = useRouter()

  const {author, destroyAuthor } = useContext(BookContext)

  function handleClick(id){
    setSelectBook(id)
    onOpen()
  }


  function handleDelete() {
    destroyAuthor(selectBook)
      onClose()
  }

  return (
 
      <Tbody
        color='gray.300'
      >
        {author.map((dados) => (
            <Tr key={dados.id}>
              <Td>{dados.id}</Td>

              <Td>{dados.name}</Td>

              <Td>{dados.year_birth}</Td>

              <Td>{dados.gender == 'M' ? 'Masculino' : 'Feminino'}</Td>

              <Td>{dados.nationality}</Td>


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
                          Deletar Editora
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Voce tem certeza? Você não pode desfazer essa ação depois.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose} bg='gray.300'>
                            Cancelar
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