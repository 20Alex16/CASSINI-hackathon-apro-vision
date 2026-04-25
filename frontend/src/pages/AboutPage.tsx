import React from "react";
import { Box, Container, Typography } from "@mui/material";
import WorkflowDiagram from "@/components/about/WorkflowDiagram";

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="xl" disableGutters data-testid="about-page">
      <Box mb={5}>
        <Typography variant="overline" sx={{ color: "#00c9a7" }}>How it works</Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>From orbit to compliance insight</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, maxWidth: 760 }}>
          A five-stage automated pipeline transforms Sentinel imagery into actionable due-diligence
          findings aligned with European sustainability regulations.
        </Typography>
      </Box>
      <WorkflowDiagram />
    </Container>
  );
};

export default AboutPage;
