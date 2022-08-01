import { TableContainer, Table, Thead, Tr, Th } from "@chakra-ui/react";
import Link from "next/link";
import { ButtonTable } from "../table/ButtonTable";
import { Gender } from "./Gender";

export function TableGender() {
  return (
    <TableContainer size="lg" justifyContent="space-between">
      <Table variant="striped" colorScheme="">
        <Thead>
          <Tr>
            <Th color="gray.100">Id</Th>
            <Th color="gray.100">name</Th>
            <Th>
              <Link href="/create/gender">
                <a>
                  <ButtonTable colorScheme="green" size="md">
                    Novo
                  </ButtonTable>
                </a>
              </Link>
            </Th>
          </Tr>
        </Thead>
        {/* Component dos Generos*/}
        <Gender />
      </Table>
    </TableContainer>
  );
}
