import { useContext, useState, useEffect } from "react"
import { api } from '../../../service/axios'
import { useRouter } from "next/router"

import { Box, Button, Flex, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { NumberInputForm } from "../../../components/form/NumberInput"
import { SelectInput } from "../../../components/form/SelectInput"
import { BookContext } from "../../../contexts/BookContext"
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { author, gender, publisher, book, setBook } = useContext(BookContext)
  const { register, handleSubmit, control, reset, watch } = useForm();
  const router = useRouter()
  const currentRouter = router.query.movieId
  const notify = () => toast.success("Livro editado com sucesso", {
    draggable: true,
    closeOnClick: true
  });

  useEffect(() => {
    const currentBook = new Promise((resolve, reject) => {
      resolve(book.find((dados) => dados.id == currentRouter))
    })
    currentBook.then(value => {
      if (value) {
        reset({ autor: value.author_id, titulo: value.title, ano: value.release_year, genero: value.gender_id, editora: value.publisher_id })
      }
    })
  }, [book]);

  const onSubmit = data => {
    console.log(data)
    api.put(`/book/${currentRouter}`,
      {
        title: data.titulo,
        release_year: data.ano,
        author_id: parseInt(data.autor),
        gender_id: parseInt(data.genero),
        publisher_id: parseInt(data.editora),
        updated_at: new Date().toISOString()
      })
      .then(() => api.get('/book')
        .then(response => setBook(response.data)))
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
          <FormControl>
            <FormLabel>Titulo</FormLabel>
            <Input placeholder={'Novo nome do livro'} type='text' {...register('titulo')} />
          </FormControl>
          <FormControl>
            <FormLabel>Ano</FormLabel>
            <Input placeholder={'Novo ano de lançamento'} type='number' {...register('ano')} />
          </FormControl>


          <SelectInput label='Autores' {...register('autor')}>
            {author.map((data) => {
              return (
                <option style={{ color: 'black' }} key={data.id} selected={values.author_id == data.id} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>


          <SelectInput label='Gêneros' {...register('genero')}>
            {gender.map((data) => (
              <option style={{ color: 'black' }} value={data.id} selected={values.gender_id == data.id} key={data.id}>{data.name}</option>
            ))}
          </SelectInput>

          <SelectInput label='Editora' {...register('editora')}>
            {publisher.map((data) => (
              <option style={{ color: 'black' }} key={data.id} selected={values.gender_id == data.id} value={data.id}>{data.name}</option>
            )
            )}
          </SelectInput>
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