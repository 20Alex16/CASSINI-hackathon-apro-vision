import React, { useEffect, useMemo, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import RiskBadge from "@/components/common/RiskBadge";
import PollutionChart from "@/components/supplier/PollutionChart";
import { getRisk, RISK_COLORS } from "@/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { Company, CompanyReport } from "@/types";
import { getCompanies, getReport } from "@/services/api";
import { useAPI } from "@/components/supplier/APIprovider";

const CompanyReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCompany, getCompanyReport } = useAPI();

  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [report, setReport] = useState<CompanyReport | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getCompanyReport(id).then(rep => setReport(rep));
    setCompany(getCompany(id));
  }, [id]);

  if (report === undefined || company === undefined) {
    return <h2>Data not found</h2>
  }

  const riskColor = getRisk(report?.pollution_index!);
  const TrendIcon = TrendingFlatRoundedIcon;
  const trendColor = RISK_COLORS.MEDIUM;
  const trendLabel = "Stable";
  /*
    const TrendIcon = trend > 1 ? TrendingUpRoundedIcon : trend < -1 ? TrendingDownRoundedIcon : TrendingFlatRoundedIcon;
    const trendColor = trend > 1 ? RISK_COLORS.HIGH : trend < -1 ? RISK_COLORS.LOW : RISK_COLORS.MEDIUM;
    const trendLabel = trend > 1 ? "Worsening" : trend < -1 ? "Improving" : "Stable";
  */
  return (
    <Container maxWidth="xl" disableGutters data-testid="supplier-report-page">
      <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: "text.secondary" }} data-testid="back-btn">
        Back
      </Button>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "flex-end" }} justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="overline" sx={{ color: "#00c9a7" }}>Company report</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }} data-testid="supplier-name">{company.name}</Typography>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 1, color: "text.secondary" }}>
            <LocationOnRoundedIcon fontSize="small" />
            <Typography variant="body2">{company.location}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.5 }}>·</Typography>
            <Typography variant="body2">Linked brand: <b style={{ color: "#e8edf4" }}>{company.name}</b></Typography>
          </Stack>
        </Box>
        <RiskBadge level={company.risk_level!} size="medium" />
      </Stack>

      {/* Summary cards */}
      <Box
        data-testid="supplier-summary-grid"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(2,1fr)" },
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
              <ScienceRoundedIcon fontSize="small" />
              <Typography variant="overline">Pollution Index</Typography>
            </Stack>
            <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: riskColor }}>
              {report?.pollution_index}
              <Typography component="span" variant="h6" sx={{ color: "text.secondary", ml: 0.5 }}> / 100</Typography>
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
              <TrendIcon fontSize="small" />
              <Typography variant="overline">12-Month Trend</Typography>
            </Stack>
            <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: trendColor }}>
              {/* {trend > 0 ? "+" : ""}{trend.toFixed(1)} */}
              {234}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>{trendLabel}</Typography>
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
              <CategoryRoundedIcon fontSize="small" />
              <Typography variant="overline">Process Category</Typography>
            </Stack>
            <Typography variant="h6" sx={{ mt: 2.5, fontWeight: 600 }}>{supplier.category}</Typography>
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
              <EventRoundedIcon fontSize="small" />
              <Typography variant="overline">Last Sentinel Scan</Typography>
            </Stack>
            <Typography variant="h6" sx={{ mt: 2.5, fontWeight: 600 }}>{supplier.lastScan}</Typography>
          </CardContent>
        </Card> */}
      </Box>

      {/* Chart + anomalies grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 3,
        }}
      >
        <Card data-testid="pollution-chart-card">
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={2}>
              <Box>
                <Typography variant="overline" sx={{ color: "text.secondary" }}>Hydrographic anomalies</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Pollution index over time</Typography>
              </Box>
              <Chip size="small" label="24-month window" variant="outlined" />
            </Stack>
            <PollutionChart data={report.data} />
          </CardContent>
        </Card>

        {/* <Card data-testid="anomaly-list-card">
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <WarningAmberRoundedIcon sx={{ color: "warning.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Detected anomalies</Typography>
            </Stack>
            <Stack spacing={1.5}>
              {anomalies.length === 0 && (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>No anomalies detected in the analysed window.</Typography>
              )}
              {anomalies.map((a, i) => {
                const c = RISK_COLORS[a.severity];
                return (
                  <Box
                    key={i}
                    data-testid={`anomaly-item-${i}`}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${c}40`,
                      bgcolor: `${c}0d`,
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography variant="caption" sx={{ color: c, fontWeight: 700, letterSpacing: "0.06em" }}>
                        {a.severity}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: '"DM Mono", monospace' }}>{a.date}</Typography>
                    </Stack>
                    <Typography variant="body2">{a.description}</Typography>
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card> */}
      </Box>
    </Container>
  );
};

export default CompanyReportPage;
