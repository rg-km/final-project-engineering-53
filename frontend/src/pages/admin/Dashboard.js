/* eslint-disable react-hooks/exhaustive-deps */
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import BaseLayout from "../../components/layouts/BaseLayout";
import { AdminCard } from "../../components/cards/AdminCard";
import useFetch from "../../hooks/useFetch";
import { DeleteMaterial } from "../../components/modals/DeleteMaterial";

export default function Dashboard() {
  // GET Materials
  const { data: materials, loading } = useFetch(
    "http://localhost:8080/materials"
  );
  const getMaterials = materials?.materials; // get response from backend

  return (
    <BaseLayout bgColor="gray.300">
      <AdminCard title="Dashboard" width="1048px">
        <Heading as="h3" fontSize="2xl" pb={5}>
          List of Materials
        </Heading>

        {loading && <Text>Loading...</Text>}

        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th w="80px">No.</Th>
                <Th>Title</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {getMaterials &&
                getMaterials?.map((material, index) => (
                  <Tr key={material.id}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textTransform="capitalize">{material.header}</Td>
                    <Td>
                      <DeleteMaterial
                        id={material.id}
                        title={material.header}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </AdminCard>
    </BaseLayout>
  );
}
