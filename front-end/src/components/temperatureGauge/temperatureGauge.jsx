import React from 'react';
import './temperatureGauge.css';
// att
function TemperatureGauge({ temperature }) {
  const isNormal = temperature >= 36 && temperature <= 39;
  const color = isNormal ? '#4D5C52' : '#780406';

  // Configurações do arco
  const minTemp = 30;
  const maxTemp = 40;
  const startAngle = 135;  // começa no canto superior esquerdo
  const endAngle = 405;    // termina no canto superior direito (270° de arco)
  const range = maxTemp - minTemp;

  // Ângulo proporcional à temperatura
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
          {/* Círculo de fundo (arco cinza) */}
          <path
            d={`
              M ${cx + radius * Math.cos((Math.PI / 180) * startAngle)} ${cy + radius * Math.sin((Math.PI / 180) * startAngle)}
              A ${radius} ${radius} 0 1 1 ${cx + radius * Math.cos((Math.PI / 180) * endAngle)} ${cy + radius * Math.sin((Math.PI / 180) * endAngle)}
            `}
            stroke="#4D5C52"
            strokeWidth="8"
            fill="none"
            opacity="0.2"
            strokeLinecap="round"
          />

          {/* Arco preenchido */}
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
            fontSize="28"
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
