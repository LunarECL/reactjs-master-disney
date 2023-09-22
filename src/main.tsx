import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "./theme.ts";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import router from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
