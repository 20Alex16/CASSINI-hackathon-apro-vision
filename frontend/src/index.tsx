import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { theme } from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIprovider } from "./components/supplier/APIprovider";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <APIprovider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </APIprovider>
    </QueryClientProvider>
  </React.StrictMode>
);
