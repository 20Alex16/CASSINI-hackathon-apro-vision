import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
// import { platformStats } from "@/services/mockData";

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: string;
  testId: string;
}

const StatCard: React.FC<StatProps> = ({ icon, label, value, accent, testId }) => (
  <Card data-testid={testId} sx={{ height: "100%" }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: `${accent}1f`,
            color: accent,
            border: `1px solid ${accent}40`,
          }}
        >
          {icon}
        </Box>
        <Typography variant="overline">{label}</Typography>
      </Stack>
      <Typography
        variant="h3"
        sx={{
          mt: 2.5,
          fontWeight: 700,
          letterSpacing: "-0.015em",
          fontFamily: '"DM Mono", monospace',
          color: "text.primary",
        }}
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" disableGutters data-testid="home-page">
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          p: { xs: 3, md: 6 },
          mb: 5,
          color: "text.primary",
          background:
            "linear-gradient(135deg, rgba(18,37,61,0.95) 0%, rgba(13,27,46,0.95) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(0,201,167,0.18) 0%, transparent 42%), radial-gradient(circle at 82% 78%, rgba(74,158,255,0.14) 0%, transparent 50%), linear-gradient(135deg, rgba(18,37,61,0.95) 0%, rgba(13,27,46,0.95) 100%)",
        }}
      >
        <Stack direction={{ xs: "column", lg: "row" }} spacing={5} alignItems="stretch">
          <Box sx={{ flex: 1 }}>
            <Chip
              icon={<SatelliteAltRoundedIcon sx={{ color: "#00c9a7 !important" }} />}
              label="Copernicus Sentinel · CSDDD aligned"
              data-testid="hero-tagline"
              sx={{
                bgcolor: "rgba(0,201,167,0.10)",
                color: "#00c9a7",
                border: "1px solid rgba(0,201,167,0.28)",
                fontWeight: 600,
                letterSpacing: "0.04em",
                mb: 3.5,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem", lg: "3.75rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                mb: 2.5,
              }}
              data-testid="hero-title"
            >
              Apro-Vision
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                maxWidth: 620,
                color: "text.secondary",
                lineHeight: 1.7,
                mb: 4,
              }}
              data-testid="hero-description"
            >
              Apro-Vision leverages Copernicus Sentinel satellite data to monitor environmental risk
              exposure across global supply chains, supporting compliance with the Corporate
              Sustainability Due Diligence Directive (CSDDD).
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<BusinessRoundedIcon />}
                onClick={() => navigate("/companies")}
                data-testid="cta-view-companies"
              >
                View Companies
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<RadarRoundedIcon />}
                onClick={() => navigate("/solutions")}
                data-testid="cta-open-risk-radar"
              >
                Open Risk Radar
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 3,
          mb: 6,
        }}
        data-testid="home-stats-grid"
      >
        <StatCard
          icon={<ApartmentRoundedIcon />}
          label="Monitored Companies"
          value={3000}
          accent="#4a9eff"
          testId="stat-companies"
        />
        <StatCard
          icon={<BusinessRoundedIcon />}
          label="Tracked Suppliers"
          value={50}
          accent="#00c9a7"
          testId="stat-suppliers"
        />
        <StatCard
          icon={<WarningAmberRoundedIcon />}
          label="Active High Risks"
          value={55}
          accent="#ef4444"
          testId="stat-risks"
        />
        <StatCard
          icon={<PublicRoundedIcon />}
          label="Countries Covered"
          value={20}
          accent="#f59e0b"
          testId="stat-countries"
        />
      </Box>

      {/* Quick guide */}
      <Box>
        <Typography variant="overline" sx={{ color: "#00c9a7" }}>
          How it works
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5, mb: 3, fontWeight: 700 }}>
          Satellite intelligence, end to end.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {[
            { title: "Ingest", text: "Copernicus Sentinel imagery is acquired on a 5-day cadence." },
            { title: "Detect", text: "Multispectral analysis flags hydrographic and atmospheric anomalies." },
            { title: "Report", text: "Findings map directly to CSDDD / ESRS E3 obligations." },
          ].map((step, i) => (
            <Card key={step.title} sx={{ p: 3 }} data-testid={`workflow-card-${i}`}>
              <Typography
                variant="overline"
                sx={{ color: "text.secondary", fontFamily: '"DM Mono", monospace', letterSpacing: "0.16em" }}
              >
                Step 0{i + 1}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                {step.text}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
