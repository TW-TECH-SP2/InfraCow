import { useState } from 'react';
import './animalScreen.css';
import logoBranca from '../../assets/logo-marrom-sem-slogan.png';
import relatorio from '../../assets/icons/relatorio.svg';
import alert from '../../assets/icons/alert.svg';
import TemperatureGauge from '../temperatureGauge/temperatureGauge';
import TemperatureChart from '../temperatureChart/temperatureChart';
function AnimalScreen({ onBack, onAbrirRelAnimal  }) {
  return (
    <div className="animal-container">
      <div className="titulo-animal">
        <h2>Ficha de Dados de: <br />Charmosa</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-animal" />
      </div>
      <div className="rel-animal" onClick={onAbrirRelAnimal}>
        <button>
          <img src={relatorio} alt="add fazenda" />Exportar Relatório de Charmosa
        </button>
      </div>
      <div className="alerta-animal">
        <button>
          <img src={alert} alt="add fazenda" />
          <p>Clique aqui para ver os possíveis riscos que seu animal pode estar correndo!</p>
        </button>
      </div>
      <div className="grafico-animal">
        <div className="gauge-container">
          <div className="gauge-esquerda">
            <h3>Última <br />temperatura <br />registrada</h3>
            <p>Temperatura registrada<br /> em: 21/09/2025 às 08:45</p>
          </div>
           <TemperatureGauge temperature={37.5} />
        </div>
      </div>
      <div className="grafico-freq">
        <TemperatureChart />
      </div>
    </div>
  );
}

export default AnimalScreen;
