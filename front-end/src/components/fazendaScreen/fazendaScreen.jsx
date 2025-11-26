import "./fazendaScreen.css";
import logoBranca from "../../assets/logo-marrom-sem-slogan.png";
import gerenciar from "../../assets/icons/gerenciar.svg";
import editDados from "../../assets/icons/edit-dados.svg";
import relatorio from "../../assets/icons/relatorio.svg";
import vacaqtd from "../../assets/icons/vaca-qtd.svg";
import TemperatureGauge from "../temperatureGauge/temperatureGauge";
import { useEffect, useState } from "react";

function FazendaScreen({
  fazendaId,
  onBack,
  onAbrirRebanho,
  onEditarFazenda,
  onAbrirRelFazenda,
}) {
  const [fazenda, setFazenda] = useState({
    id: null,
    nome_fazenda: "Fazenda",
    rua: "-",
    cidade: "-",
    bairro: "-",
    CEP: "-",
  });
  const [quantidades, setQuantidades] = useState({
    total: 0,
    machos: 0,
    femeas: 0,
  });
  const [mediaTemp, setMediaTemp] = useState(0);
  const [erro, setErro] = useState(null);
  const [animais, setAnimais] = useState([]);

  const fetchFazenda = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/fazendas/${fazendaId}`,
        {
          headers: { autorizacao: `Bearer ${token}` },
        }
      );

      let fazendaData = {
        id: null,
        nome_fazenda: "Fazenda (sem dados)",
        rua: "-",
        cidade: "-",
        bairro: "-",
        CEP: "-",
      };

      if (response.ok) {
        const data = await response.json();
        fazendaData = {
          id: data.id,
          nome_fazenda: data.nome_fazenda || "Fazenda (sem dados)",
          rua: data.rua || "-",
          cidade: data.cidade || "-",
          bairro: data.bairro || "-",
          CEP: data.CEP || "-",
        };
      } else {
        console.log("Erro ao buscar fazenda");
      }

      setFazenda(fazendaData)

      const statsResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/fazendas/${fazendaId}/estatisticas`,
        {
          headers: { autorizacao: `Bearer ${token}` },
        }
      );

      if (statsResponse.ok) {
        const stats = await statsResponse.json();
        setQuantidades({
          total: stats.total ?? 0,
          machos: stats.machos ?? 0,
          femeas: stats.femeas ?? 0,
        });
        setMediaTemp(stats.mediaTemp ?? 0);
      } else {
        console.log("Erro ao buscar estatísticas da fazenda");
        setQuantidades({ total: 0, machos: 0, femeas: 0 });
        setMediaTemp(0);
      }

      const animaisResponse = await fetch(`${import.meta.env.VITE_API_URL}/animais/fazenda/${fazendaId}`,
        { headers: { autorizacao: `Bearer ${token}` } }
      )

      if (animaisResponse.ok) {
        const data = await animaisResponse.json();
        setAnimais(data.animais || []);
      } else {
        console.log("Erro ao buscar animais");
        setAnimais([]);
      }

    } catch (error) {
      console.log("Erro ao carregar dados da fazenda:", error);
      setErro("Erro ao carregar dados da fazenda");
    }
  };

  useEffect(() => {
    if (fazendaId) fetchFazenda();
  }, [fazendaId]);

  const handleGerenciarAnimais = () => {
    if (onAbrirRebanho) {
      onAbrirRebanho(fazendaId);
    } else {
      console.log("❌ onAbrirRebanho não está definido!");
    }
  };

  if (!fazenda) {
    return (
      <div className="fazenda-container">
        <p>Carregando dados da fazenda...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="fazenda-container">
        <p style={{ color: "red" }}>Erro ao carregar: {erro}</p>
      </div>
    );
  }

  return (
    <div className="fazenda-container">
      <div className="titulo-fazenda">
        <h2>{fazenda.nome_fazenda}</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-fazenda" />
      </div>
      <div className="fazenda-dash">
        <div className="acoes-fazenda">
          <button
            className="gerar-rel"
            onClick={() => onAbrirRelFazenda?.(fazendaId)}
          >
            <img src={relatorio} alt="" />
            Relatório
          </button>
          <button className="editar-fazenda" onClick={() => onEditarFazenda(fazendaId)}>
            <img src={editDados} alt="" />
            Edit. fazenda
          </button>
        </div>
        <div className="painel-qtd">
          <div className="esquerda-painel">
            <div className="total-qtd">
              <img src={vacaqtd} alt="" />
              <p>
                Quant. <br />
                total de animais
              </p>
              <h1>{quantidades.total}</h1>
            </div>
          </div>
          <div className="direita-painel">
            <div className="cima-painel">
              <div className="superior-cima">
                <img src={vacaqtd} alt="" />
                <p>Quant. fêmeas</p>
              </div>
              <div className="inferior-cima">
                <h2>{quantidades.femeas}</h2>
              </div>
            </div>
            <div className="baixo-painel">
              <div className="superior-baixo">
                <img src={vacaqtd} alt="" />
                <p>Quant. machos</p>
              </div>
              <div className="inferior-baixo">
                <h2>{quantidades.machos}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="linha-fazenda">
          <button className="geren-animais" onClick={handleGerenciarAnimais}>
            <img src={gerenciar} alt="" />
            Gerenciar Animais
          </button>
        </div>
        <div className="grafico-animal">
          <div className="gauge-container">
            <div className="gauge-esquerda">
              <h3>
                Média Geral de <br />
                Temperatura{" "}
              </h3>
              <p>
                De acordo com as <br />
                medições mais recentes
              </p>
            </div>
            {/* valor do grafico passar por variavel apos realizar calculo de media de temperaturas do rebanho */}
            <TemperatureGauge temperature={mediaTemp || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FazendaScreen;
