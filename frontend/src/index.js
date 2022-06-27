import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthProvider";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
