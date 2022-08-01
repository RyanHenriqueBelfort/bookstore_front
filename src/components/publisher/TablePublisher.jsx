import { TableContainer, Table, Thead, Tr, Th } from "@chakra-ui/react";
import Link from "next/link";
import { ButtonTable } from "../table/ButtonTable";
import { Publisher } from "./Publisher";

export function TablePublisher() {
  return (
    <TableContainer size="lg" justifyContent="space-between">
      <Table variant="striped" colorScheme=''>
        <Thead>
          <Tr>
            <Th color="gray.100">Id</Th>
            <Th color="gray.100">Name</Th>
            <Th color="gray.100">Descrição</Th>
            <Th>
              <Link href="/create/publisher">
                <a>
                  <ButtonTable colorScheme="green" size="md">
                    Novo
                  </ButtonTable>
                </a>
              </Link>
            </Th>
          </Tr>
        </Thead>
        {/* Componente das editoras*/}
        <Publisher />
      </Table>
    </TableContainer>
  );
}
