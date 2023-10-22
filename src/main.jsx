import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Home from "./pages/Home.jsx";
import Cities from "./pages/Cities.jsx"
import PrevisionHere from "./pages/PrevisionHere.jsx"
import PrevisionCities from "./pages/PrevisionCities.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="pages">
          <Route path="Home" element={<Home />} />
            <Route path="Cities" element={<Cities />} />
            <Route path="PrevisionHere" element={<PrevisionHere />} />
            <Route path="PrevisionCities" element={<PrevisionCities />} />
            <Route
              path="*"
              element={
                <main>
                  <p>404 - No existe la ruta!</p>
                </main>
              }
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
