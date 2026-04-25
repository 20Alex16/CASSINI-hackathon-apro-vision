import React from "react";
import { Chip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { RiskLevel } from "@/types";
import { RISK_COLORS } from "@/theme/theme";

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "small" | "medium";
}

const LABELS: Record<RiskLevel, string> = {
  LOW: "Low Risk",
  MEDIUM: "Medium Risk",
  HIGH: "High Risk",
};

// Convert hex to rgba
const rgba = (hex: string, a: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = "small" }) => {
  const color = RISK_COLORS[level];
  return (
    <Chip
      data-testid={`risk-badge-${level.toLowerCase()}`}
      size={size}
      icon={<CircleIcon sx={{ fontSize: "9px !important", color: `${color} !important` }} />}
      label={LABELS[level]}
      sx={{
        bgcolor: rgba(color, 0.12),
        color: color,
        border: `1px solid ${rgba(color, 0.32)}`,
        borderRadius: 999,
        fontWeight: 600,
        letterSpacing: "0.04em",
        ".MuiChip-icon": { ml: 1.25 },
        ".MuiChip-label": { paddingInline: 1.25 },
      }}
    />
  );
};

export default RiskBadge;
