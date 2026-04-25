import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import AppLayout from "@/layouts/AppLayout";
import LoginPage from "./pages/LoginPage";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CompaniesPage = lazy(() => import("@/pages/CompaniesPage"));
const SolutionsPage = lazy(() => import("@/pages/SolutionsPage"));
const CompanyReportPage = lazy(() => import("@/pages/CompanyReportPage"));
const ConformityPage = lazy(() => import("@/pages/ConformityPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));

const LoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
    }}
    data-testid="route-loading-indicator"
  >
    <CircularProgress color="primary" />
  </Box>
);

const App: React.FC = () => {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/company/:id" element={<CompanyReportPage />} />
          <Route path="/conformity" element={<ConformityPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default App;
