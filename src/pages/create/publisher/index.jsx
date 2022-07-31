import { useContext, useEffect } from "react"
import { api } from '../../../service/axios'

import { Button, Textarea, Stack, Flex } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { BookContext } from "../../../contexts/BookContext"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { setPublisher } = useContext(BookContext)
  const { register, handleSubmit } = useForm();

  const notifySuccess = () => toast.success("Editora criado com sucesso", {
    draggable: true,
    closeOnClick: true
  });
  const notifyError = () => toast.error("Preencha todos os campos", {
    draggable: true,
    closeOnClick: true
  });

  const onSubmit = data => {
      api.post('/publisher', {
        name: data.name,
        description: data.description
      })
        .then(() => api.get('/publisher')
          .then(response => setPublisher(response.data))
          .then(() => notifySuccess()))

        .catch(function (error) {
          console.log(error);
        });
  };

  return (
    <Flex
      bgColor='gray.900'
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
      gap='50'
      textColor='white'
    >
      <Flex
        direction='column'
        w='350px'
        border='1px'
        p={5}
        borderRadius={5}
        as='form'
        onSubmit={handleSubmit(onSubmit)}
        h='330px'
        justifyContent='center'
        alignItems=''
      >
        <Stack spacing={5}>
          <InputForm title='Nome' label='Nome do Gênero' type='text' name='name' {...register('name')} />
          <Textarea placeholder='Descrição da editora' {...register('description')} />         
          <Button type="submit" colorScheme='green'>Criar</Button>
          <Link href='/'>
            <Button bg='gray.600' _hover={{
              bg: 'gray.500'
            }}>Voltar</Button>
          </Link>
        </Stack>
        <ToastContainer />
      </Flex>
    </Flex>
  )
}