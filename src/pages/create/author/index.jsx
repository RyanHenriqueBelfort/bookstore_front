import { useContext } from "react";
import { api } from "../../../service/axios";

import {
  Button,
  Flex,
  RadioGroup,
  Radio,
  Stack,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { InputForm } from "../../../components/form/Input";
import { BookContext } from "../../../contexts/BookContext";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const { setAuthor } = useContext(BookContext);
  const { register, handleSubmit } = useForm();

  const notifySuccess = () =>
    toast.success("Autor criado com sucesso", {
      draggable: true,
      closeOnClick: true,
    });
  const notifyError = () =>
    toast.error("Preencha todos os campos", {
      draggable: true,
      closeOnClick: true,
    });

  const onSubmit = (data) => {
    if (data.gender == null) {
      notifyError();
    } else {
      api.post("/author", {
          name: data.name,
          year_birth: data.year_birth,
          gender: data.gender,
          nationality: data.nationality,
        })
        .then(() =>
          api.get("/author")
            .then((response) => setAuthor(response.data))
            .then(() => notifySuccess())
        )
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Flex
      bgColor="gray.900"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      gap="50"
      textColor="white"
    >
      <Flex
        direction="column"
        w="350px"
        border="1px"
        p={5}
        borderRadius={5}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        justifyContent="flex-end"
      >
        <Stack spacing={5}>
          <InputForm
            title="Nome"
            label="Nome do autor"
            type="text"
            name="name"
            {...register("name")}
          />
          <InputForm
            title="Ano de nascimento"
            label="Ano de nascimento"
            type="number"
            name="year_birth"
            {...register("year_birth")}
          />
          <InputForm
            title="Nacionalidade"
            label="Nacionalidade"
            type="text"
            name="nationality"
            {...register("nationality")}
          />
          <FormControl isRequired>
            <FormLabel>Sexo</FormLabel>
            <RadioGroup name="sexo-form" isRe>
              <Stack direction="row">
                <Radio
                  value="M"
                  onClick={(e) => e.preventDefault}
                  {...register("gender")}
                >
                  Masculino
                </Radio>
                <Radio value="F" {...register("gender")}>
                  Feminino
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Button type="submit" colorScheme="green">
            Criar
          </Button>
          <Link href="/">
            <Button
              bg="gray.600"
              _hover={{
                bg: "gray.500",
              }}
            >
              Voltar
            </Button>
          </Link>
        </Stack>
        <ToastContainer />
      </Flex>
    </Flex>
  );
}
