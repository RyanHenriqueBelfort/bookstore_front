import { useContext, useEffect } from "react"
import { api } from '../../../service/axios'
import { useRouter } from "next/router"

import {Button, Flex, Textarea, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { BookContext } from "../../../contexts/BookContext"
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { publisher, setPublisher } = useContext(BookContext)
  const { register, handleSubmit, control, reset } = useForm();
  const router = useRouter()
  const currentRouter = router.query.publisherId
  const notify = () => toast.success("Editora editado com sucesso", {
    draggable: true,
    closeOnClick: true
  });

  useEffect(() => {
    const currentPublisher = new Promise((resolve, reject) => {
      resolve(publisher.find((dados) => dados.id == currentRouter))
    })
    currentPublisher.then(value => {
      if (value) {
        reset({ name: value.name, description: value.description })
      }
    })
  }, [publisher]);

  const onSubmit = data => {
    api.put(`/publisher/${currentRouter}`,
      {
        name: data.name,
        description: data.description
      })
      .then(() => api.get('/publisher')
        .then(response => setPublisher(response.data)))
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
        justifyContent='flex-end'
      >
        <Stack spacing={5}>
          <InputForm title='Nome' label='Nome do Gênero' type='text' name='name' {...register('name')} />
          <Textarea placeholder='Descrição da editora' size='md' h='130px' mb='8px' {...register('description')} />
          <Button type="submit" colorScheme='messenger' onClick={notify}>Editar</Button>
          <Button bg='gray.600' _hover={{
            bg: 'gray.500'
          }} onClick={() => router.push('/')}>Cancelar</Button>
        </Stack>
      </Flex>
      <ToastContainer />
    </Flex>
  )
}