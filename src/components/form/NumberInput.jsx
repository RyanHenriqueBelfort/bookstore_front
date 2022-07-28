import { FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormErrorMessage} from "@chakra-ui/react"
import { forwardRef } from "react";

const InputBase = ({label, name,error = null, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <NumberInput max={new Date().getFullYear()}>
        <NumberInputField placeholder={name} name={name} id={name} ref={ref} {...rest}/>
        <NumberInputStepper >
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const  NumberInputForm = forwardRef(InputBase)