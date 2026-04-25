import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import { workflowSteps } from "@/services/mockData";

const ICONS: Record<string, React.ReactNode> = {
  satellite_alt: <SatelliteAltRoundedIcon />,
  memory: <MemoryRoundedIcon />,
  radar: <RadarRoundedIcon />,
  monitoring: <MonitorHeartRoundedIcon />,
  verified: <VerifiedRoundedIcon />,
};

export const WorkflowDiagram: React.FC = () => {
  return (
    <Box data-testid="workflow-diagram">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "1fr" },
          gap: { xs: 2.5, lg: 1.5 },
          alignItems: "stretch",
        }}
      >
        {/* {workflowSteps.map((step, idx) => (
          <React.Fragment key={step.step}>
            <Card data-testid={`workflow-step-${step.step}`} sx={{ height: "100%" }}>
              <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(0,201,167,0.12)",
                      color: "#00c9a7",
                      border: "1px solid rgba(0,201,167,0.28)",
                    }}
                  >
                    {ICONS[step.icon]}
                  </Box>
                  <Typography
                    variant="overline"
                    sx={{ color: "#00c9a7", fontFamily: '"DM Mono", monospace', fontSize: 12, letterSpacing: "0.16em" }}
                  >
                    0{step.step}
                  </Typography>
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </React.Fragment>
        ))} */}
      </Box>

      {/* Process timeline */}
      <Box mt={6}>
        <Typography variant="overline" sx={{ color: "text.secondary" }}>Pipeline metrics</Typography>
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2.5,
          }}
        >
          {[
            { k: "Revisit cadence", v: "5 days" },
            { k: "Spectral bands", v: "13" },
            { k: "Spatial resolution", v: "10 – 60 m" },
            { k: "Compliance frameworks", v: "CSDDD · ESRS E3" },
          ].map((m) => (
            <Card key={m.k} sx={{ p: 2.5 }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>{m.k}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>{m.v}</Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WorkflowDiagram;
