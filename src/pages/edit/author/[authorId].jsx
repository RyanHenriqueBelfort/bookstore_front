import { useContext, useEffect } from "react"
import { api } from '../../../service/axios'
import { useRouter } from "next/router"

import { Box, Button, Flex, RadioGroup, Radio, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { BookContext } from "../../../contexts/BookContext"
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { author, setAuthor} = useContext(BookContext)
  const { register, handleSubmit, control, reset, watch } = useForm();
  const router = useRouter()
  const currentRouter = router.query.authorId
  const notify = () => toast.success("Autor editado com sucesso", {
    draggable: true,
    closeOnClick: true
  });

  useEffect(() => {
    const currentAuthor = new Promise((resolve, reject) => {
      resolve(author.find((dados) => dados.id == currentRouter))
    })
    currentAuthor.then(value => {
      if (value) {
        reset({ name: value.name, year_birth: value.year_birth, nationality: value.nationality, gender: value.gender})
      }
    })
  }, [author]);

  const onSubmit = data => {
    api.put(`/author/${currentRouter}`,
      {
        name: data.name,
        year_birth: data.year_birth,
        nationality: data.nationality,
        gender: data.gender
      })
      .then(() => api.get('/author')
        .then(response => setAuthor(response.data)))
      .catch(function (error) {
        console.log(error);
      });
  };

  const values = watch()

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
          <InputForm title='Nome' label='Nome do autor' type='text' name='name' {...register('name')} />

          <InputForm
            title='Data de nascimento'
            label='Data de nascimento'
            type="number"
            name='year_birth'
            {...register('year_birth')}
          />

          <InputForm title='Nacionalidade' label='Nacionalidade' type='text' name='nationality' {...register('nationality')} />

          <RadioGroup name='sexo-form'>
            <Stack direction='row'>
              <Radio value='M' checked="checked" onClick={(e)=> e.preventDefault} {...register('gender')}>Masculino</Radio>
              <Radio value='F' {...register('gender')}>Feminino</Radio>
            </Stack>
          </RadioGroup>
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