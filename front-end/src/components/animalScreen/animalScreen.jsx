import { useState, useEffect } from 'react';
import './animalScreen.css';
import logoBranca from '../../assets/logo-marrom-sem-slogan.png';
import relatorio from '../../assets/icons/relatorio.svg';
import alert from '../../assets/icons/alert.svg';
import TemperatureGauge from '../temperatureGauge/temperatureGauge';
import TemperatureChart from '../temperatureChart/temperatureChart';

function AnimalScreen({ animalId, onBack, onAbrirRelAnimal }) {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado");
          return;
        }

        console.log("🔍 Buscando animal com ID:", animalId);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/animais/${animalId}`,
          {
            headers: { autorizacao: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Dados do animal recebidos:", data);
          // A API retorna { animal: {...} }, então pegamos data.animal
          setAnimal(data.animal || data);
        } else {
          console.log("❌ Erro ao buscar animal - Status:", response.status);
        }
      } catch (error) {
        console.log("❌ Erro ao carregar dados do animal:", error);
      } finally {
        setLoading(false);
      }
    };

    if (animalId) {
      fetchAnimal();
    } else {
      console.log("⚠️ animalId não foi passado para AnimalScreen");
      setLoading(false);
    }
  }, [animalId]);

  if (loading) {
    return (
      <div className="animal-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="animal-container">
      <div className="titulo-animal">
        <h2>Ficha de Dados de: <br />{animal?.nome_animal || "Animal"}</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-animal" />
      </div>
      <div className="rel-animal" onClick={onAbrirRelAnimal}>
        <button>
          <img src={relatorio} alt="add fazenda" />Exportar Relatório de {animal?.nome_animal || "Animal"}
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
