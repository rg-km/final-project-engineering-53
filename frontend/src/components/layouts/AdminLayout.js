import { HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

import Footer from "../footer/Footer";
import ScrollToTop from "../ScrollToTop";
import Sidebar from "../sections/Sidebar";

export const AdminLayout = () => {
  // const { auth } = useAuth();

  return (
    <main>
      <ScrollToTop>
        <HStack w="full" h="full" align="start">
          <Sidebar />
          <Outlet />
        </HStack>
        <Footer />
      </ScrollToTop>
    </main>
  );
};
