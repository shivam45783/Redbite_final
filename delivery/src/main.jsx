import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import RiderContextProvider from "./context/RiderContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RiderContextProvider>
    <Toaster />
    <StrictMode>
      <App />
    </StrictMode>
    </RiderContextProvider>
  </BrowserRouter>
);
