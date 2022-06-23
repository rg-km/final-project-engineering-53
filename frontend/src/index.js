import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
