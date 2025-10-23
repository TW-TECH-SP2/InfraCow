// TemperatureChart.jsx
import React, { useState } from "react";

const mockData = {
  Dia: [
    { label: "06h", temp: 37.2 },
    { label: "09h", temp: 37.5 },
    { label: "12h", temp: 37.7 },
    { label: "15h", temp: 37.6 },
    { label: "18h", temp: 37.4 },
    { label: "21h", temp: 37.3 },
  ],
  Semana: [
    { label: "Seg", temp: 37.2 },
    { label: "Ter", temp: 37.4 },
    { label: "Qua", temp: 37.5 },
    { label: "Qui", temp: 37.6 },
    { label: "Sex", temp: 37.7 },
    { label: "Sáb", temp: 37.5 },
    { label: "Dom", temp: 37.4 },
  ],
};

const TemperatureChart = () => {
  const [period, setPeriod] = useState("Dia");

  const data = mockData[period];
  const width = 400;
  const height = 150;
  const padding = 20;
  const temps = data.map(d => d.temp);
  const minTemp = Math.min(...temps) - 0.1;
  const maxTemp = Math.max(...temps) + 0.1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((d.temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding);
    return { x, y };
  });

  const linePath = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        {["Dia", "Semana"].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            style={{ marginRight: 5, padding: "5px 10px" }}
          >
            {p}
          </button>
        ))}
      </div>

      <svg width={width} height={height}>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(123,94,87,0.8)" />
            <stop offset="100%" stopColor="rgba(123,94,87,0)" />
          </linearGradient>
        </defs>

        {/* Preenchimento gradiente */}
        <polygon
          points={`${points.map(p => `${p.x},${p.y}`).join(" ")} ${points[points.length - 1].x},${height - padding} ${points[0].x},${height - padding}`}
          fill="url(#grad)"
        />

        {/* Linha */}
        <polyline
          fill="none"
          stroke="#7B5E57"
          strokeWidth="2"
          points={linePath}
        />

        {/* Pontos */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#7B5E57" />
        ))}
      </svg>
    </div>
  );
};

export default TemperatureChart;
