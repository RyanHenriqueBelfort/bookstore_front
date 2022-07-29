// import { useContext, useState, useReducer } from "react"
// import { api } from '../../../service/axios'

// import { Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react"
// import { InputForm } from "../../../components/form/Input"
// import { SelectInput } from "../../../components/form/SelectInput"
// import { BookContext } from "../../../contexts/BookContext"
// import { set, useForm, } from "react-hook-form";

// import { useRouter } from "next/router"

// export default function Index() {
//   const [bookState, setBookState] = useState()




//   const { author, gender, publisher, book } = useContext(BookContext)
//   const { register, handleSubmit } = useForm();
//   const router = useRouter()
//   const currentRouter = router.query.movieId


//   const currentBook = new Promise((resolve, reject) =>{
//     resolve(book.find((dados) => dados.id == currentRouter))
//   })


//   currentBook.then(value => setBookState(value))

//   const onSubmit = data => {
//     api.post('/book', {
//       title: data.titulo,
//       release_year: data.ano,
//       author_id: data.autores,
//       gender_id: data.editora,
//       publisher_id: data.generos
//     })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   return (
//     <Flex
//       bgColor='gray.900'
//       w='100vw'
//       h='100vh'
//       align='center'
//       justify='center'
//       textColor='white'

//     >
//       <Flex
//         direction='column'
//         w='350px'
//         border='1px'
//         p={5}
//         borderRadius={5}
//         as='form'
//         onSubmit={handleSubmit(onSubmit)}
//         justifyContent='flex-end'
//       >
//         <Stack spacing={5}>
//           <InputForm
//             title='Titulo'
//             label='Nome do livro'

//             value={bookState ? bookState.title : ''}
//             type='text'
//             name='titulo'
//             {...register('titulo')}
//           />
//           <InputForm
//             title='Ano lançamento'
//             label='Ano lançamento'
//             value={bookState ? bookState.release_year : ''}
//             type='number'
//             name='Ano'
//             {...register('ano')}
//           />

//           <SelectInput label='Autores' {...register('autores')}>
//             {author.map((data) => {
//               return (
//                 <option style={{ color: 'black' }} value={data.id}>{data.name}</option>
//               )
//             })}
//           </SelectInput>

//           <SelectInput label='Gêneros' {...register('generos')}>
//             {gender.map((data) => {
//               return (
//                 <option style={{ color: 'black' }} value={data.id}>{data.name}</option>
//               )
//             })}
//           </SelectInput>

//           <SelectInput label='Editora' {...register('editora')}>
//             {publisher.map((data) => {
//               return (
//                 <option style={{ color: 'black' }} value={data.id}>{data.name}</option>
//               )
//             })}
//           </SelectInput>
//           <Stack spacing={3}>
//             <Button type="submit" colorScheme='green'>Criar</Button>
//             <Button type="submit" onClick={setIsEdit}  colorScheme='messenger'>Editar</Button>
//           </Stack>
//         </Stack>

//       </Flex>
//     </Flex>
//   )
// }


import { useContext } from "react"
import { api } from '../../../service/axios'
import { useRouter } from "next/router"

import { Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react"
import { InputForm } from "../../../components/form/Input"
import { NumberInputForm } from "../../../components/form/NumberInput"
import { SelectInput } from "../../../components/form/SelectInput"
import { BookContext } from "../../../contexts/BookContext"
import { useForm, } from "react-hook-form";

export default function Index() {
  const { author, gender, publisher } = useContext(BookContext)
  const { register, handleSubmit } = useForm();

  const router = useRouter()
  const currentRouter = router.query.movieId


  const onSubmit = data => {
    api.put(`/book/${currentRouter}`, 
    {
      title: data.titulo,
      release_year: data.ano,
      author_id: data.autores,
      gender_id: data.editora,
      publisher_id: data.generos,
      updated_at: new Date().toISOString()
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
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
          <InputForm title='Titulo' label='Nome do livro' type='text' name='titulo' {...register('titulo')} />
          <NumberInputForm label='Ano lançamento' type='number' name='Ano' {...register('ano')} />
          <SelectInput label='Autores' {...register('autores')}>
            {author.map((data) => {
              return (
                <option style={{ color: 'black' }} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <SelectInput label='Gêneros' {...register('generos')}>
            {gender.map((data) => {
              return (
                <option style={{ color: 'black' }} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <SelectInput label='Editora' {...register('editora')}>
            {publisher.map((data) => {
              return (
                <option style={{ color: 'black' }} value={data.id}>{data.name}</option>
              )
            })}
          </SelectInput>

          <Button type="submit" colorScheme='messenger'>Criar</Button>
        </Stack>

      </Flex>
    </Flex>
  )
}