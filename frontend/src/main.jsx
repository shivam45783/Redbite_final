import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider, { StoreContext } from "./context/StoreContext.jsx";
import CartPop from "./components/CartPop/CartPop.jsx";
import { PrimeReactProvider } from "primereact/api";

import ScrollNotify from "./components/ScrollNotify/ScrollNotify.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>

      <StoreContextProvider>
        <PrimeReactProvider>
          <CartPop />
          <ScrollNotify />
          <App />
        </PrimeReactProvider>
      </StoreContextProvider>

  </BrowserRouter>
);
