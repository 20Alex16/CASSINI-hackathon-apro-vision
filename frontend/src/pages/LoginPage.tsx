import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  SatelliteAlt,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Shield,
  Analytics,
  Language,
  Person,
  Login,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Text } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const Logo: React.FC = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "10px",
        background: "linear-gradient(135deg, #00c9a7 0%, #0098c0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 20px rgba(0,201,167,0.3)",
        flexShrink: 0,
      }}
    >
      <SatelliteAlt sx={{ color: "#0d1b2e", fontSize: 24 }} />
    </Box>
    <Typography
      sx={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 700,
        fontSize: "1.25rem",
        color: "#e8edf4",
        letterSpacing: "-0.01em",
      }}
    >
      Apro-Vision
    </Typography>
  </Box>
);

interface TrustPillarProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustPillar: React.FC<TrustPillarProps> = ({ icon, title, description }) => (
  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
    <Box
      sx={{
        mt: 0.25,
        width: 36,
        height: 36,
        borderRadius: "8px",
        bgcolor: "rgba(0,201,167,0.12)",
        border: "1px solid rgba(0,201,167,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "#e8edf4",
          mb: 0.25,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.8rem",
          color: "#8fa3bb",
          lineHeight: 1.5,
        }}
      >
        {description}
      </Typography>
    </Box>
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange =
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.username) {
      newErrors.username = "Username is required.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    navigate("/");
  };

  // ── Shared input sx ───────────────────────────────────────────────────────

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(255,255,255,0.04)",
      borderRadius: "10px",
      fontFamily: '"DM Sans", sans-serif',
      color: "#e8edf4",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.14)",
        transition: "border-color 0.2s",
      },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.28)" },
      "&.Mui-focused fieldset": {
        borderColor: "#00c9a7",
        borderWidth: "1px",
        boxShadow: "0 0 0 3px rgba(0,201,167,0.12)",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: '"DM Sans", sans-serif',
      color: "#8fa3bb",
      "&.Mui-focused": { color: "#00c9a7" },
    },
    "& .MuiFormHelperText-root": {
      fontFamily: '"DM Sans", sans-serif',
    },
    "& input": { color: "#e8edf4" },
  };

  const iconColor = "#8fa3bb";

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0d1b2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
        // Radar/grid background
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,152,192,0.18) 0%, transparent 70%),
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        borderRadius: "50px"
      }}
    >
      <Box
        sx={{
          flex: "0 0 420px",
          p: { xs: 4, md: 5 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Logo />

        {/* Header */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: "1.55rem",
            color: "#e8edf4",
            letterSpacing: "-0.02em",
            mb: 0.75,
          }}
        >
          Sign in to Apro-Vision
        </Typography>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.875rem",
            color: "#8fa3bb",
            mb: 3.5,
          }}
        >
          Access your compliance intelligence dashboard
        </Typography>

        {/* Overline */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#8fa3bb",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            mb: 2,
          }}
        >
          Enterprise Credentials
        </Typography>

        {/* Username */}
        <TextField
          label="Username"
          type="text"
          value={form.username}
          onChange={handleChange("username")}
          error={!!errors.username}
          helperText={errors.username}
          fullWidth
          size="small"
          sx={{ ...inputSx, mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: iconColor, fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange("password")}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          size="small"
          sx={{ ...inputSx, mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: iconColor, fontSize: 18 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                  size="small"
                  sx={{ color: iconColor }}
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ fontSize: 18 }} />
                  ) : (
                    <Visibility sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Sign In Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
          disableElevation
          sx={{
            bgcolor: "#00c9a7",
            color: "#0d1b2e",
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: "0.95rem",
            textTransform: "none",
            borderRadius: "10px",
            py: 1.4,
            mb: 3,
            "&:hover": {
              bgcolor: "#00b898",
              boxShadow: "0 0 24px rgba(0,201,167,0.35)",
            },
            "&:disabled": { bgcolor: "rgba(0,201,167,0.4)", color: "#0d1b2e" },
            transition: "all 0.2s",
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#0d1b2e" }} />
          ) : (
            "Sign In"
          )}
        </Button>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 3 }} />

        {/* Footer */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.82rem",
            color: "#8fa3bb",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#00c9a7",
              fontWeight: 600,
              "&:hover": { color: "#33d4b8" },
              transition: "color 0.2s",
            }}
          >
            Contact Sales
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;