import { TableContainer, Table, Thead, Tr, Th } from "@chakra-ui/react";
import Link from "next/link";
import { Book } from "./Book";
import { ButtonTable } from "../table/ButtonTable";

export function TableBook() {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="">
        <Thead>
          <Tr>
            <Th color="gray.100">Id</Th>
            <Th color="gray.100">Livro</Th>
            <Th color="gray.100">Autor</Th>
            <Th color="gray.100">Gênero</Th>
            <Th color="gray.100">Editora</Th>
            <Th isNumeric color="gray.100">
              Ano lançamento
            </Th>
            <Th>
              <Link href="/create/book">
                <a>
                  <ButtonTable colorScheme="green" size="md">
                    Novo
                  </ButtonTable>
                </a>
              </Link>
            </Th>
          </Tr>
        </Thead>
        {/* Component dos Livros */}
        <Book />
      </Table>
    </TableContainer>
  );
}
