import { Tab } from "@chakra-ui/react";

export function Aba({ children }) {
  return (
    <Tab
      fontSize="lg"
      color="gray.400"
      _selected={{
        background: "gray.700",
        color: "green.400",
      }}
    >
      {children}
    </Tab>
  );
}
