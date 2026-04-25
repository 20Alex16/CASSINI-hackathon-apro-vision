import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "@/components/common/Logo";

interface TopNavigationProps {
  onToggleSidebar: () => void;
}

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Companies", path: "/companies" },
  { label: "Solutions", path: "/solutions" },
  { label: "Conformity", path: "/conformity" },
  { label: "Login", path: "/login" },
  { label: "About", path: "/about" },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const [unread] = useState(3);

  return (
    <AppBar position="sticky" data-testid="top-navigation">
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
          <IconButton
            onClick={onToggleSidebar}
            sx={{ display: { xs: "inline-flex", lg: "none" } }}
            aria-label="Toggle navigation"
            data-testid="sidebar-toggle-btn"
          >
            <MenuRoundedIcon />
          </IconButton>

          <Stack direction="row" spacing={1.5} alignItems="center" component={RouterLink} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            <Logo size={50} />
            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 700, color: "text.primary" }}>
                Apro-Vision
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 10 }}>
                ESG Compliance Intelligence
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: "none", md: "flex" } }}
            data-testid="top-nav-links"
          >
            {NAV_LINKS.map((link) => {
              const active = link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path);
              return (
                <Button
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  sx={{
                    color: active ? "#00c9a7" : "text.secondary",
                    fontWeight: active ? 600 : 500,
                    px: 2,
                    py: 1,
                    position: "relative",
                    "&:after": active
                      ? {
                          content: '""',
                          position: "absolute",
                          left: 16,
                          right: 16,
                          bottom: 6,
                          height: 2,
                          borderRadius: 2,
                          bgcolor: "#00c9a7",
                        }
                      : undefined,
                    "&:hover": { color: "text.primary", bgcolor: "transparent" },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: { xs: 0, md: 2 } }}>
            <Tooltip title="Alerts">
              <IconButton aria-label="alerts" data-testid="alerts-btn" sx={{ color: "text.secondary" }}>
                <Box sx={{ position: "relative" }}>
                  <NotificationsNoneRoundedIcon />
                  {unread > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        width: 8,
                        height: 8,
                        bgcolor: "error.main",
                        borderRadius: "50%",
                        border: "2px solid #0d1b2e",
                      }}
                    />
                  )}
                </Box>
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton aria-label="settings" data-testid="settings-btn" sx={{ color: "text.secondary" }}>
                <SettingsRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <Avatar
                data-testid="user-avatar"
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "rgba(0,201,167,0.18)",
                  color: "#00c9a7",
                  fontWeight: 700,
                  fontSize: 13,
                  ml: 0.5,
                  cursor: "pointer",
                  border: "1px solid rgba(0,201,167,0.4)",
                }}
              >
                EC
              </Avatar>
            </Tooltip>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavigation;
