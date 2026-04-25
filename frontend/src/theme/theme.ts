import { Company } from "@/types";
import { createTheme } from "@mui/material/styles";

// Risk / status colors (semantic, soft-style usage)
export const RISK_COLORS = {
  LOW: "#22c55e",
  MEDIUM: "#f59e0b",
  HIGH: "#ef4444",
} as const;

export function getRisk(risk_score: number): Company["risk_level"] {
  if (risk_score <= 50)
    return 'LOW'

  if (risk_score <= 70)
    return 'MEDIUM'

  return 'HIGH'
}

export function assignRisk(comp: Company): Company {
  return { risk_level: getRisk(comp.risk_score), ...comp }
}

// Brand
const PRIMARY = "#00c9a7";
const PRIMARY_DARK = "#0d1b2e";
const ACCENT = "#4a9eff";

// Surfaces
const BG_DEFAULT = "#0d1b2e";
const BG_PAPER = "rgba(18,37,61,0.8)";
const BG_APPBAR = "rgba(13,27,46,0.92)";
const BG_DRAWER = "rgba(13,27,46,0.6)";

// Text
const TEXT_PRIMARY = "#e8edf4";
const TEXT_SECONDARY = "#8fa3bb";
const TEXT_MUTED = "#5a7491";

// Lines
const DIVIDER = "rgba(255,255,255,0.07)";
const DIVIDER_HOVER = "rgba(255,255,255,0.14)";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: PRIMARY, contrastText: PRIMARY_DARK },
    secondary: { main: ACCENT, contrastText: PRIMARY_DARK },
    success: { main: RISK_COLORS.LOW },
    warning: { main: RISK_COLORS.MEDIUM },
    error: { main: RISK_COLORS.HIGH },
    background: { default: BG_DEFAULT, paper: BG_PAPER },
    text: { primary: TEXT_PRIMARY, secondary: TEXT_SECONDARY, disabled: TEXT_MUTED },
    divider: DIVIDER,
  },
  typography: {
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.015em" },
    h4: { fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
    overline: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: TEXT_MUTED,
      lineHeight: 1.4,
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: BG_DEFAULT,
          color: TEXT_PRIMARY,
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(0,201,167,0.06) 0%, transparent 38%), radial-gradient(circle at 88% 92%, rgba(74,158,255,0.05) 0%, transparent 42%)",
          backgroundAttachment: "fixed",
        },
        "*::-webkit-scrollbar": { width: 10, height: 10 },
        "*::-webkit-scrollbar-track": { background: "transparent" },
        "*::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.08)", borderRadius: 8 },
        "*::-webkit-scrollbar-thumb:hover": { background: "rgba(255,255,255,0.18)" },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: BG_APPBAR,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "none",
          borderBottom: `1px solid ${DIVIDER}`,
          color: TEXT_PRIMARY,
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: BG_DRAWER,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRight: `1px solid ${DIVIDER}`,
          backgroundImage: "none",
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: BG_PAPER,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1px solid ${DIVIDER}`,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: BG_PAPER,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${DIVIDER}`,
          borderRadius: 16,
          boxShadow: "none",
          transition: "border-color 220ms ease, transform 220ms ease, background-color 220ms ease",
          "&:hover": { borderColor: DIVIDER_HOVER },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          paddingBlock: 10,
          boxShadow: "none",
          transition: "background-color 160ms ease, border-color 160ms ease, color 160ms ease",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          backgroundColor: PRIMARY,
          color: PRIMARY_DARK,
          "&:hover": { backgroundColor: "#1ad8b8" },
        },
        outlined: {
          borderColor: DIVIDER_HOVER,
          color: TEXT_PRIMARY,
          "&:hover": { borderColor: PRIMARY, backgroundColor: "rgba(0,201,167,0.06)" },
        },
        text: {
          color: TEXT_SECONDARY,
          "&:hover": { color: PRIMARY, backgroundColor: "transparent" },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: TEXT_SECONDARY,
          "&:hover": { color: TEXT_PRIMARY, backgroundColor: "rgba(255,255,255,0.04)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          letterSpacing: "0.02em",
        },
        outlined: {
          borderColor: DIVIDER_HOVER,
          color: TEXT_SECONDARY,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: { backgroundColor: "transparent" },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.02)",
          "& .MuiTableCell-head": {
            color: TEXT_MUTED,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.72rem",
            fontWeight: 600,
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${DIVIDER}`,
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 160ms ease",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
          "&:last-of-type td": { borderBottom: 0 },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { color: TEXT_SECONDARY, borderTop: `1px solid ${DIVIDER}` },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: `${TEXT_MUTED} !important`,
          "&.Mui-active": { color: `${TEXT_PRIMARY} !important` },
          "& .MuiTableSortLabel-icon": { color: `${PRIMARY} !important` },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.03)",
          color: TEXT_PRIMARY,
          "& fieldset": { borderColor: DIVIDER },
          "&:hover fieldset": { borderColor: DIVIDER_HOVER },
          "&.Mui-focused fieldset": { borderColor: PRIMARY },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: TEXT_SECONDARY, "&.Mui-focused": { color: PRIMARY } },
      },
    },
    MuiSelect: {
      styleOverrides: { icon: { color: TEXT_MUTED } },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(13,27,46,0.97)",
          backgroundImage: "none",
          border: `1px solid ${DIVIDER_HOVER}`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(13,27,46,0.96)",
          border: `1px solid ${DIVIDER_HOVER}`,
          fontSize: 12,
          fontWeight: 500,
          color: TEXT_PRIMARY,
          backdropFilter: "blur(8px)",
        },
        arrow: { color: "rgba(13,27,46,0.96)" },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 6 },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: DIVIDER } },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: TEXT_SECONDARY,
          "&:hover": { backgroundColor: "rgba(255,255,255,0.04)", color: TEXT_PRIMARY },
        },
      },
    },
  },
});

export default theme;
