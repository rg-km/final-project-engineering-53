import * as React from "react";

import Navbar from "./components/navbar/Navbar";
import Hero from "./components/sections/Hero";
import Learning from "./components/sections/Learning";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Learning />
      </main>
    </>
  );
}
