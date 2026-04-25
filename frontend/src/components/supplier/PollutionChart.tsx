import React from "react";
import { Box } from "@mui/material";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Anomaly, PollutionData } from "@/types";
import { RISK_COLORS } from "@/theme/theme";

interface PollutionChartProps {
  data: PollutionData[];
  anomalies?: Anomaly[];
}

const TooltipContent: React.FC<{ active?: boolean; payload?: Array<{ value: number }>; label?: string }> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const v = payload[0].value;
  return (
    <Box
      sx={{
        bgcolor: "rgba(13,27,46,0.96)",
        color: "#e8edf4",
        px: 1.75,
        py: 1.25,
        borderRadius: 1.5,
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 12px 28px -10px rgba(0,0,0,0.6)",
        fontSize: 12,
        backdropFilter: "blur(10px)",
      }}
    >
      <Box sx={{ color: "#8fa3bb", fontFamily: '"DM Mono", monospace', fontSize: 11 }}>{label}</Box>
      <Box sx={{ fontWeight: 700, mt: 0.25, fontFamily: '"DM Mono", monospace', color: "#00c9a7" }}>
        WPI {v}
      </Box>
    </Box>
  );
};

export const PollutionChart: React.FC<PollutionChartProps> = ({ data, anomalies }) => {
  return (
    <Box sx={{ width: "100%", height: 360 }} data-testid="pollution-chart">
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="poll-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c9a7" stopOpacity={0.32} />
              <stop offset="95%" stopColor="#00c9a7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.07)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#8fa3bb", fontSize: 11, fontFamily: "DM Mono, monospace" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            interval={2}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#8fa3bb", fontSize: 11, fontFamily: "DM Mono, monospace" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            label={{
              value: "Pollution Index",
              angle: -90,
              position: "insideLeft",
              offset: 20,
              fill: "#5a7491",
              fontSize: 11,
              letterSpacing: "0.08em",
            }}
          />
          <Tooltip
            content={<TooltipContent />}
            cursor={{ stroke: "#00c9a7", strokeDasharray: "3 4", strokeOpacity: 0.55 }}
          />
          <Area type="monotone" dataKey="value" stroke="none" fill="url(#poll-fill)" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00c9a7"
            strokeWidth={2.4}
            dot={{ r: 3, fill: "#00c9a7", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#00c9a7", stroke: "#0d1b2e", strokeWidth: 2 }}
            isAnimationActive
            animationDuration={750}
          />
          {/* {anomalies.map((a, i) => {
            const point = data.find((d) => d.date.startsWith(a.date.slice(0, 7)));
            if (!point) return null;
            return (
              <ReferenceDot
                key={i}
                x={point.date}
                y={point.value}
                r={7}
                fill={RISK_COLORS[a.severity]}
                stroke="#0d1b2e"
                strokeWidth={2.5}
              />
            );
          })} */}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PollutionChart;
