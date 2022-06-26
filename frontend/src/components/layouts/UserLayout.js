import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import UserNavbar from "../navbar/UserNavbar";
import ScrollToTop from "../ScrollToTop";

export const UserLayout = () => {
  const { auth } = useAuth();

  return (
    <main>
      <ScrollToTop>
        {auth.role ? <UserNavbar /> : <Navbar />}
        <Outlet />
        <Footer />
      </ScrollToTop>
    </main>
  );
};
