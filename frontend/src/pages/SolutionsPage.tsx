import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import RiskMap from "@/components/map/RiskMap";

const SolutionsPage: React.FC = () => {
  return (
    <Container maxWidth="xl" disableGutters data-testid="solutions-page">
      <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "flex-end" }} justifyContent="space-between" spacing={2} mb={3}>
        <Box>
          <Typography variant="overline" sx={{ color: "#00c9a7" }}>Risk Radar</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>Global supplier exposure</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, maxWidth: 720 }}>
            Live geospatial overview of monitored Tier-1 and Tier-2 suppliers, ranked by composite
            satellite-derived pollution indicators.
          </Typography>
        </Box>
      </Stack>
      <RiskMap />
    </Container>
  );
};

export default SolutionsPage;
