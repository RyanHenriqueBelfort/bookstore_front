import { useContext, useEffect } from "react"
import { api } from '../../../service/axios'

import { Button, Center, Flex, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { BookContext } from "../../../contexts/BookContext"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { setGender } = useContext(BookContext)
  const { register, handleSubmit } = useForm();

  const notifySuccess = () => toast.success("Gênero criado com sucesso", {
    draggable: true,
    closeOnClick: true
  });
  const notifyError = () => toast.error("Preencha todos os campos", {
    draggable: true,
    closeOnClick: true
  });

  const onSubmit = data => {
      api.post('/gender', {
        name: data.name,
      })
        .then(() => api.get('/gender')
          .then(response => setGender(response.data))
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