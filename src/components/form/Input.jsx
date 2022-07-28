import { FormControl, FormLabel, Input, FormErrorMessage  } from "@chakra-ui/react"
import { forwardRef } from "react";

const InputBase = ({title, label, name,error = null, ...rest }, ref) => {
  return (
    <FormControl isRequired isInvalid={!!error}>
      <FormLabel>{title}</FormLabel>
      <Input placeholder={label} type='text'  name={name} id={name} ref={ref} {...rest}/>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const  InputForm = forwardRef(InputBase)