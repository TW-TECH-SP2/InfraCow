import React from 'react';
import './temperatureGauge.css';

function TemperatureGauge({ temperature }) {
  // Faixas de temperatura
  let color = '#4D5C52';
  if (temperature < 37.5) color = '#1E90FF';       z
  else if (temperature >= 37.5 && temperature <= 39.3) color = '#4CAF50';
  else if (temperature > 39.4 && temperature <= 40) color = '#FFA500';  
  else color = '#FF0000';                      

  // Configurações do arco
  const minTemp = 30;
  const maxTemp = 41;
  const startAngle = 135;
  const endAngle = 405;
  const range = maxTemp - minTemp;
  const angle = startAngle + ((temperature - minTemp) / range) * (endAngle - startAngle);

  // Parâmetros do círculo
  const radius = 60;
  const cx = 70;
  const cy = 70;

  // Coordenadas do arco
  const startX = cx + radius * Math.cos((Math.PI / 180) * startAngle);
  const startY = cy + radius * Math.sin((Math.PI / 180) * startAngle);
  const endX = cx + radius * Math.cos((Math.PI / 180) * angle);
  const endY = cy + radius * Math.sin((Math.PI / 180) * angle);
  const largeArcFlag = angle - startAngle > 180 ? 1 : 0;

  const arcPath = `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
  `;

  return (
    <div className="gauge-direita">
      <svg width="140" height="140">
        {/* Fundo do arco */}
        <path
          d={`
            M ${cx + radius * Math.cos((Math.PI / 180) * startAngle)} ${cy + radius * Math.sin((Math.PI / 180) * startAngle)}
            A ${radius} ${radius} 0 1 1 ${cx + radius * Math.cos((Math.PI / 180) * endAngle)} ${cy + radius * Math.sin((Math.PI / 180) * endAngle)}
          `}
          stroke="#CCC"
          strokeWidth="8"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* Arco ativo */}
        <path
          d={arcPath}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Texto central */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="600"
          fill={color}
        >
          {temperature.toFixed(1)}°C
        </text>
      </svg>
    </div>
  );
}

export default TemperatureGauge;
