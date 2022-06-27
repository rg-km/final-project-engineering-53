/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import axios from "../../api/axiosGO";
import { Heading } from "@chakra-ui/react";
import BaseLayout from "../../components/layouts/BaseLayout";
import { AdminCard } from "../../components/cards/AdminCard";

// const API_URL = "/admin/user";

export default function AdminMaterials() {
  return (
    <BaseLayout bgColor="gray.300">
      <AdminCard title="Dashboard">
        <Heading as="h3" fontSize="2xl" pb={5}>
          Admin Materials
        </Heading>
      </AdminCard>
    </BaseLayout>
  );
}
