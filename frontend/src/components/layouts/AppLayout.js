import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import ScrollToTop from "../ScrollToTop";

const AppLayout = () => {
  return (
    <main>
      <ScrollToTop>
        <Navbar />
        <Outlet />
        <Footer />
      </ScrollToTop>
    </main>
  );
};

export default AppLayout;
