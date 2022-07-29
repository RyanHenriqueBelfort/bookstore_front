import { useDisclosure } from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Lorem,
  ModalCloseButton,
} from '@chakra-ui/react'


export function ButtonTable({children, ...rest}){
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <Button size='sm'{...rest}>{children}</Button>
  )
}