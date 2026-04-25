import React, { useMemo } from "react";
import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
// import { suppliers } from "@/services/mockData";
import { RISK_COLORS } from "@/theme/theme";
import RiskBadge from "@/components/common/RiskBadge";
import { RiskLevel } from "@/types";
import { useAPI } from "../supplier/APIprovider";

const buildIcon = (level: RiskLevel) =>
  L.divIcon({
    className: "",
    html: `<div class="risk-marker" style="background:${RISK_COLORS[level]}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -10],
  });

const ICONS: Record<RiskLevel, L.DivIcon> = {
  LOW: buildIcon("LOW"),
  MEDIUM: buildIcon("MEDIUM"),
  HIGH: buildIcon("HIGH"),
};

const LEGEND: { level: RiskLevel; label: string }[] = [
  { level: "LOW", label: "Low risk" },
  { level: "MEDIUM", label: "Medium risk" },
  { level: "HIGH", label: "High risk" },
];

export const RiskMap: React.FC = () => {
  const navigate = useNavigate();
  const { companies, getCompanyReport } = useAPI();
  const counts = 3;
  // const counts = useMemo(() => {
  //   return suppliers.reduce(
  //     (acc, s) => {
  //       acc[s.riskLevel] += 1;
  //       return acc;
  //     },
  //     { LOW: 0, MEDIUM: 0, HIGH: 0 } as Record<RiskLevel, number>
  //   );
  // }, []);

  return (
    <Card
      data-testid="risk-map-card"
      sx={{ position: "relative", overflow: "hidden", height: { xs: 520, md: 640 }, p: 0 }}
    >
      <MapContainer
        center={[20, 30]}
        zoom={2.4}
        minZoom={2}
        scrollWheelZoom
        worldCopyJump
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        {companies.map((c) => (
          <Marker key={c.id} position={[33, 33]} icon={ICONS[c.risk_level!]}>
            <Popup maxWidth={280}>
              <Box sx={{ p: 0.5, minWidth: 220 }} data-testid={`map-popup-${c.id}`}>
                <Typography
                  variant="overline"
                  sx={{ color: "text.secondary", fontSize: 10, letterSpacing: "0.12em" }}
                >
                  {c.location}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, lineHeight: 1.3, mt: 0.25, color: "text.primary" }}
                >
                  {c.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <RiskBadge level={c.risk_level!} />
                  <Chip
                    size="small"
                    label={`WPI ${getCompanyReport(c.id.toString()).then(rep => rep.pollution_index)}`}
                    variant="outlined"
                    sx={{ fontFamily: '"DM Mono", monospace' }}
                  />
                </Stack>
                <button
                  data-testid={`map-popup-view-${c.id}`}
                  onClick={() => navigate(`/supplier/${c.id}`)}
                  style={{
                    marginTop: 12,
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: 8,
                    background: "#00c9a7",
                    color: "#0d1b2e",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.02em",
                  }}
                >
                  View details →
                </button>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Card
        data-testid="map-legend"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          p: 2,
          minWidth: 220,
          zIndex: 999,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          bgcolor: "rgba(13,27,46,0.78)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <Typography variant="overline" sx={{ display: "block", mb: 1.25 }}>
          Risk legend
        </Typography>
        <Stack spacing={1}>
          {LEGEND.map((l) => (
            <Stack key={l.level} direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: RISK_COLORS[l.level],
                    boxShadow: `0 0 0 3px ${RISK_COLORS[l.level]}26`,
                  }}
                />
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  {l.label}
                </Typography>
              </Stack>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontFamily: '"DM Mono", monospace' }}
              >
                {/* {counts[l.level]} */}
                456
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Card>
  );
};

export default RiskMap;
