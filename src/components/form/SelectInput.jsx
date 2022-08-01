import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { forwardRef } from "react";

const InputBase = ({ label, children, ...rest }, ref) => {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Select color="white" ref={ref} {...rest}>
        {children}
      </Select>
    </FormControl>
  );
};

export const SelectInput = forwardRef(InputBase);
