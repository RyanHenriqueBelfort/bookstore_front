import { TableContainer, Table, Thead, Tr, Th } from '@chakra-ui/react'
import Link from "next/link";
import { ButtonTable } from '../table/ButtonTable';
import { Author } from './Author';


export function TableAuthor() {
  return (
    <TableContainer>
      <Table variant='striped' colorScheme=''>
        <Thead>
          <Tr>
            <Th color='gray.100'>Id</Th>
            <Th color='gray.100'>name</Th>
            <Th color='gray.100'>Data nascimento</Th>
            <Th color='gray.100'>Sexo</Th>
            <Th color='gray.100'>Nacionalidade</Th>

            <Th>
              <Link href='/create/author'>
                <a>
                  <ButtonTable colorScheme='green' size='md'>Novo</ButtonTable>
                </a>
              </Link>
            </Th>
          </Tr>
        </Thead>
        {/* Component dos Autores*/}
        <Author />
      </Table>
    </TableContainer>
  )
}