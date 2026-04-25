import React, { useState } from "react";
import { Box } from "@mui/material";
import TopNavigation from "@/components/layout/TopNavigation";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }} data-testid="app-layout">
      <TopNavigation onToggleSidebar={() => setMobileOpen((v) => !v)} />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 5 },
          }}
          data-testid="main-content"
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
