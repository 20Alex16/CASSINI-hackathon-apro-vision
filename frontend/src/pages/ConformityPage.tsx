import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
// import { dataSources } from "@/services/mockData";

const ICONS: Record<string, React.ReactNode> = {
  satellite: <SatelliteAltRoundedIcon />,
  waves: <WavesRoundedIcon />,
  air: <AirRoundedIcon />,
  cloud: <CloudRoundedIcon />,
};

const ConformityPage: React.FC = () => {
  return (
    <Container maxWidth="xl" disableGutters data-testid="conformity-page">
      <Box mb={5}>
        <Typography variant="overline" sx={{ color: "#00c9a7" }}>
          Transparency
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
          Data sources & legal framework
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, maxWidth: 760, lineHeight: 1.7 }}>
          Apro-Vision relies exclusively on publicly available European Space Agency satellite feeds.
          The platform is designed for use as decision-support analytics for CSDDD due-diligence
          processes.
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Data sources
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 3,
          mb: 5,
        }}
        data-testid="data-source-grid"
      >
        {/* {dataSources.map((source) => (
          <Card key={source.title} data-testid={`data-source-${source.icon}`}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
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
                    flexShrink: 0,
                  }}
                >
                  {ICONS[source.icon] ?? <SatelliteAltRoundedIcon />}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {source.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 0.5, lineHeight: 1.6 }}
                  >
                    {source.description}
                  </Typography>
                  <Typography
                    variant="overline"
                    sx={{ color: "#00c9a7", mt: 1.5, display: "block", fontSize: "0.68rem" }}
                  >
                    {source.reference}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))} */}
      </Box>

      {/* Legal Disclaimer */}
      <Card
        data-testid="legal-disclaimer-card"
        sx={{
          p: { xs: 3, md: 4 },
          mb: 5,
          borderLeft: "4px solid",
          borderLeftColor: "#00c9a7",
          background: "rgba(0,201,167,0.04)",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <ShieldRoundedIcon sx={{ color: "#00c9a7", mt: 0.5 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              Legal disclaimer
            </Typography>
            <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.75 }}>
              This platform provides analytical insights derived from publicly available satellite
              data sources. All outputs represent risk indications and analytical suggestions and
              must not be interpreted as formal accusations, legal determinations, or verified
              compliance judgments.
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* Download */}
      <Card sx={{ p: { xs: 3, md: 4 } }} data-testid="whitepaper-card">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={3}
        >
          <Box>
            <Typography variant="overline" sx={{ color: "#00c9a7" }}>
              Reference document
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
              Apro-Vision CSDDD Whitepaper
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, maxWidth: 560 }}>
              Detailed methodology, data lineage and CSDDD article-level mapping for compliance teams.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadRoundedIcon />}
            data-testid="download-whitepaper-btn"
          >
            Download CSDDD Whitepaper
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default ConformityPage;
