import { FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormErrorMessage} from "@chakra-ui/react"
import { forwardRef } from "react";

const InputBase = ({label, name, ...rest}, ref) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <NumberInput max={new Date().getFullYear()}>
        <NumberInputField placeholder={name} value='2001'  name={name} id={name} ref={ref} {...rest}/>
        <NumberInputStepper >
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}

export const  NumberInputForm = forwardRef(InputBase)