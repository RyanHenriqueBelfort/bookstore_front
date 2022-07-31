import { useContext, useEffect } from "react"
import { api } from '../../../service/axios'
import { useRouter } from "next/router"

import { Button, Flex, Input, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { BookContext } from "../../../contexts/BookContext"
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { gender, setGender} = useContext(BookContext)
  const { register, handleSubmit, control, reset, watch } = useForm();
  const router = useRouter()
  const currentRouter = router.query.genderId
  const notify = () => toast.success("Gênero editado com sucesso", {
    draggable: true,
    closeOnClick: true
  });

  useEffect(() => {
    const currentGender = new Promise((resolve, reject) => {
      resolve(gender.find((dados) => dados.id == currentRouter))
    })
    currentGender.then(value => {
      if (value) {
        reset({ name: value.name})
      }
    })
  }, [gender]);

  const onSubmit = data => {
    api.put(`/gender/${currentRouter}`,
      {
        name: data.name,
      })
      .then(() => api.get('/gender')
        .then(response => setGender(response.data)))
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
          <Button type="submit" colorScheme='messenger' onClick={notify}>Editar</Button>
          <Button bg='gray.600' _hover={{
            bg: 'gray.500'
          }} onClick={() => router.push('/')}>Voltar</Button>
        </Stack>
      </Flex>
      <ToastContainer />
    </Flex>
  )
}