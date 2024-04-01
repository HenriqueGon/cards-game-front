import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "./screens/Home";
import Game from "./screens/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/games/:uuid' element={<Game />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
