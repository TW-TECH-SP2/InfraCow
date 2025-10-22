import { useState } from 'react';
import './animalScreen.css';
import logoBranca from '../../assets/logo-marrom-sem-slogan.png';
import relatorio from '../../assets/icons/relatorio.svg';
import alert from '../../assets/icons/alert.svg';
function AnimalScreen({ onBack  }) {
  return (
    <div className="animal-container">
      <div className="titulo-animal">
        <h2>Ficha de Dados de: <br />Charmosa</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-animal" />
      </div>
      <div className="rel-animal">
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
        <p>grafico1</p>
      </div>
      <div className="grafico-animal">
        <p>grafico2</p>
      </div>
    </div>
  );
}

export default AnimalScreen;
