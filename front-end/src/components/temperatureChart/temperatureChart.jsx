import React, { useState } from "react";
import "./temperatureChart.css";

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
  Mês: [
    { label: "Jan", temp: 37.8 },
    { label: "Fev", temp: 37.5 },
    { label: "Mar", temp: 37.2 },
    { label: "Abr", temp: 37.4 },
    { label: "Mai", temp: 37.3 },
    { label: "Jun", temp: 37.5 },
    { label: "Jul", temp: 37.6 },
    { label: "Ago", temp: 37.8 },
    { label: "Set", temp: 37.7 },
  ],
  Ano: [],
};

const TemperatureChart = () => {
  const [period, setPeriod] = useState("Mês");
  const data = mockData[period];
  const width = 380;
  const height = 180;
  const padding = 30;

  const temps = data.map(d => d.temp);
  const minTemp = Math.min(...temps) - 0.1;
  const maxTemp = Math.max(...temps) + 0.1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y =
      height -
      padding -
      ((d.temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding);
    return { x, y, label: d.label };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  return (
    <div className="chart-container">
      <h3>Variação da<br />Temperatura Corporal</h3>
      <div className="period-buttons">
        {["Dia", "Semana", "Mês", "Ano"].map(p => (
          <button
            key={p}
            className={period === p ? "active" : ""}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <svg width={width} height={height} className="chart-svg">
        <defs>
          <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B5E57" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7B5E57" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Área preenchida */}
        <path
          d={`${path} L ${points[points.length - 1].x},${height - padding} L ${
            points[0].x
          },${height - padding} Z`}
          fill="url(#tempGradient)"
          stroke="none"
        />

        {/* Linha curva */}
        <path d={path} fill="none" stroke="#4B3B34" strokeWidth="2.5" />

        {/* Ponto ativo (Abr no exemplo) */}
        {points.map((p, i) => (
          <g key={i}>
            {p.label === "Abr" && (
              <>
                <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#4B3B34" strokeWidth="2" />
                <rect
                  x={p.x - 18}
                  y={height - padding + 12}
                  width="36"
                  height="22"
                  rx="11"
                  fill="#4B3B34"
                />
                <text
                  x={p.x}
                  y={height - padding + 28}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="12"
                  fontWeight="500"
                >
                  {p.label}
                </text>
                <line
                  x1={p.x}
                  y1={p.y + 5}
                  x2={p.x}
                  y2={height - padding + 12}
                  stroke="#4B3B34"
                  strokeWidth="1.5"
                />
              </>
            )}
          </g>
        ))}
      </svg>

      <div className="labels">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};

export default TemperatureChart;
