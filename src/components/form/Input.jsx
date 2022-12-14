import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { forwardRef } from "react";

const InputBase = ({ title, label, name, ...rest }, ref) => {
  return (
    <FormControl isRequired>
      <FormLabel>{title}</FormLabel>
      <Input placeholder={label} name={name} id={name} ref={ref} {...rest} />
    </FormControl>
  );
};

export const InputForm = forwardRef(InputBase);
