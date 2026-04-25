import React from "react";
import { Box, Container, Divider, Link, Stack, Typography } from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      data-testid="app-footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: 6,
        py: 4,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
          <Box>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              Powered by Copernicus Sentinel data &middot; European Space Agency (ESA)
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
              Outputs represent analytical risk indications based on publicly available satellite data sources.
            </Typography>
          </Box>
          <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
            <Link href="#" underline="hover" color="text.secondary" variant="body2" data-testid="footer-link-privacy">
              Privacy
            </Link>
            <Link href="#" underline="hover" color="text.secondary" variant="body2" data-testid="footer-link-terms">
              Terms
            </Link>
            <Link href="#" underline="hover" color="text.secondary" variant="body2" data-testid="footer-link-contact">
              Contact
            </Link>
          </Stack>
        </Stack>
        <Divider sx={{ my: 2.5 }} />
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          &copy; {new Date().getFullYear()} Apro-Vision &middot; All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
