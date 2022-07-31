import { useContext, useRef, useState } from "react"
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

export function Publisher() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [selectBook, setSelectBook] = useState()
  const router = useRouter()

  const { publisher, destroyPublisher } = useContext(BookContext)

  function handleClick(id) {
    setSelectBook(id)
    onOpen()
  }


  function handleDelete() {
    destroyPublisher(selectBook) 
    onClose()
  }

  return (

    <Tbody
      color='gray.300'
    >
      {publisher.map((dados) => (
        <Tr key={dados.id}>
          <Td>{dados.id}</Td>

          <Td>{dados.name}</Td>

          <Td>{dados.description}</Td>
          

          <Td>
            <Stack direction='row' spacing={5}>
              <ButtonTable colorScheme="linkedin" onClick={() => router.push(`/edit/publisher/${dados.id}`)}>
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
                      Deletar Gênero
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