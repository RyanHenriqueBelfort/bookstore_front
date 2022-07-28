import { useContext } from "react"
import {api} from '../../../service/axios'

import { Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { NumberInputForm } from "../../../components/form/NumberInput"
import { SelectInput } from "../../../components/form/SelectInput"
import { BookContext } from "../../../contexts/BookContext"
import { useForm,} from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const CreateFormSchema = yup.object({
  title: yup.string().required('Titulo é obrigatório'),
  year: yup.number().required('Ano é obrigatório').positive('Te que ser numero positivo').integer(),
})

export default function Index() {
  const { author, gender, publisher } = useContext(BookContext) 

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(CreateFormSchema)
  });

  const onSubmit = data =>{
    api.post('/book', {
      title: data.titulo,
      release_year: data.ano,
      author_id: data.autores,
      gender_id: data.editora,
      publisher_id: data.generos
    })
    .then(function (response) {
      console.log(response);
    })
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
          <InputForm title='Titulo' label='Nome do livro' type='text' name='titulo' error={errors.title} {...register('titulo')}/>
          <NumberInputForm label='Ano lançamento' type='number' name='Ano' error={errors.year} {...register('ano')}/>
          <SelectInput label='Autores' {...register('autores')}>
            {author.map((data) => {
              return (
                <option style={{color: 'black'}} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <SelectInput label='Gêneros' {...register('generos')}>
            {gender.map((data) => {
              return (
                <option style={{color: 'black'}} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <SelectInput label='Editora' {...register('editora')}>
            {publisher.map((data) => {
              return (
                <option style={{color: 'black'}} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <Button type="submit" colorScheme='messenger'>Criar</Button>
        </Stack>
        
      </Flex>
    </Flex>
  )
}