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
import { AddMaterial } from "../../components/modals/AddMaterial";
import { EditMaterial } from "../../components/modals/EditMaterial";

export default function AdminMaterials() {
  // GET Materials
  const { data: materials, loading } = useFetch(
    "http://localhost:8080/materials"
  );
  const getMaterials = materials?.materials; // get response from backend
  const countId = getMaterials?.length; // count how many fetched items

  return (
    <BaseLayout bgColor="gray.300">
      <AdminCard
        title="Materials"
        width="1048px"
        overflowY={countId < 7 ? "hidden" : "scroll"} // if items over 7 show scroll
      >
        <AddMaterial />

        <Heading as="h3" fontSize="2xl" py={8}>
          List of Materials
        </Heading>

        {loading && <Text>Loading...</Text>}

        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th w="80px">No.</Th>
                <Th minW="600px">Title</Th>
                <Th textAlign="center">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {getMaterials &&
                getMaterials?.map((material, index) => (
                  <Tr key={material.id}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textTransform="capitalize">{material.header}</Td>
                    <Td>
                      <EditMaterial
                        id={material.id}
                        title={material.header}
                        description={material.sub_header}
                        content={material.content}
                      />
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
