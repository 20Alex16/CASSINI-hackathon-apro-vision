import React from "react";
import { Box } from "@mui/material";
import Icon from '@mui/material/Icon';
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 50 }) => {
  return (
    <Box
      data-testid="apro-logo"
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        background: "linear-gradient(135deg, rgba(0,201,167,0.18) 0%, rgba(74,158,255,0.12) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(0,201,167,0.45)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), inset 0 0 14px rgba(0,201,167,0.18)",
      }}
    >
        <img
          src="logo.png"
          alt="description"
          style={{ color: "#00c9a7", fontSize: size * 2, width: size * 2, height: size * 2 }}
        />
    </Box>
  );
};

export default Logo;
