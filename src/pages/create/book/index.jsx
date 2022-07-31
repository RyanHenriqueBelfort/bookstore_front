import { useContext, useEffect } from "react"
import { api } from '../../../service/axios'

import { Button, Flex, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { SelectInput } from "../../../components/form/SelectInput"
import { BookContext } from "../../../contexts/BookContext"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { author, gender,book, publisher, setBook } = useContext(BookContext)
  const { register, handleSubmit} = useForm();

  const notifySuccess = () => toast.success("Livro criado com sucesso", {
    draggable: true,
    closeOnClick: true
  });
  const notifyError = () => toast.error("Preencha o campo autores, editora e gêneros", {
    draggable: true,
    closeOnClick: true
  });

  const onSubmit = data => {
      api.post('/book', {
        title: data.titulo,
        release_year: data.ano,
        author_id:  parseInt(data.autor),
        gender_id:  parseInt(data.genero),
        publisher_id:  parseInt(data.editora)
      })
        .then(() => api.get('/book')
          .then(response => setBook(response.data))
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
        justifyContent='flex-end'
      >
        <Stack spacing={5}>
          <InputForm title='Titulo' label='Nome do livro' type='text' name='titulo' {...register('titulo')} />
          {/* <NumberInputForm label='Ano lançamento' type='number' name='Ano' {...register('ano')} /> */}
          <InputForm
            title='Ano lançamento'
            label='Ano lançamento'
            type="number"
            name='Ano'
            {...register('ano')}
          />
          <SelectInput label='Autores' defaultValue="DEFAULT" {...register('autor')}>
            <option value="DEFAULT" disabled>
              Escolhe uma opção
            </option>
            {author.map((data) => {
              return (
                <>
                  <option style={{ color: 'black' }} key={data.autor} value={data.id}>{data.name}</option>
                </>
              )
            })}
          </SelectInput>

          <SelectInput label='Gêneros' defaultValue="DEFAULT" {...register('genero')}>
            <option value="DEFAULT" disabled>
              Escolhe uma opção
            </option>
            {gender.map((data) => {
              return (
                <option style={{ color: 'black' }} key={data.id} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <SelectInput label='Editora' defaultValue="DEFAULT" {...register('editora')}>
            <option value="DEFAULT" disabled>
              Escolhe uma opção
            </option>
            {publisher.map((data) => {
              return (
                <option style={{ color: 'black' }} key={data.id} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <Button type="submit" colorScheme='green'>Criar</Button>
          <Link href='/'>
            <Button bg='gray.600' _hover={{
              bg: 'gray.500'
            }}>Cancelar</Button>
          </Link>
        </Stack>
        <ToastContainer /> 
      </Flex>
    </Flex>
  )
}