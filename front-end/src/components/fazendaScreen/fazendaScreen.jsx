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
  // Dados fictícios da fazenda (independente do ID recebido)
  const [fazenda] = useState({
    id: fazendaId || 1,
    nome_fazenda: "Recanto",
    rua: "Estrada Principal",
    cidade: "Campo Verde",
    bairro: "Zona Rural",
    CEP: "00000-000",
  });

  const [quantidades, setQuantidades] = useState({
    total: 0,
    machos: 0,
    femeas: 0,
  });
  const [mediaTemp, setMediaTemp] = useState(0);

  // Mock de animais (mesmos usados em RebanhoScreen)
  const mockAnimais = [
    { id: 1, nome_animal: 'Mimosa', genero: 'F', raca: 'Holandesa', peso: 610, idade: 4, tipo: 'leiteiro' },
    { id: 2, nome_animal: 'Thor', genero: 'M', raca: 'Angus', peso: 720, idade: 5, tipo: 'corte' },
    { id: 3, nome_animal: 'Estrela', genero: 'F', raca: 'Jersey', peso: 500, idade: 3, tipo: 'leiteiro' },
    { id: 4, nome_animal: 'Brutus', genero: 'M', raca: 'Nelore', peso: 800, idade: 6, tipo: 'reprodutor' },
    { id: 5, nome_animal: 'Lua', genero: 'F', raca: 'Girolando', peso: 580, idade: 2, tipo: 'leiteiro' },
  ];

  // Mock de medições (similar à lógica da tela de rebanho)
  const [medicoes] = useState(() => {
    const now = Date.now();
    return mockAnimais.flatMap(a => {
      return Array.from({ length: 8 }).map((_, i) => ({
        animais_id: a.id,
        temperatura: (36.5 + Math.random() * 2).toFixed(1),
        datahora: new Date(now - i * 60 * 60 * 1000).toISOString(),
      }));
    });
  });

  useEffect(() => {
    // Calcula quantidades com base nos mocks
    const total = mockAnimais.length;
    const machos = mockAnimais.filter(a => a.genero === 'M').length;
    const femeas = mockAnimais.filter(a => a.genero === 'F').length;
    setQuantidades({ total, machos, femeas });

    // Média da última medição de cada animal
    const ultimaPorAnimal = mockAnimais.map(a => {
      const meds = medicoes.filter(m => m.animais_id === a.id)
        .sort((m1, m2) => new Date(m2.datahora) - new Date(m1.datahora));
      return meds[0] ? parseFloat(meds[0].temperatura) : null;
    }).filter(v => v !== null);
    const media = ultimaPorAnimal.length
      ? (ultimaPorAnimal.reduce((acc, v) => acc + v, 0) / ultimaPorAnimal.length)
      : 0;
    setMediaTemp(parseFloat(media.toFixed(1)));
  }, [fazendaId]);

  const handleGerenciarAnimais = () => {
    if (onAbrirRebanho) {
      onAbrirRebanho(fazenda.id);
    }
  };

  return (
    <div className="fazenda-container">
      <div className="titulo-fazenda">
        <h2>Fazenda {fazenda.nome_fazenda}</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-fazenda" />
      </div>
      <div className="fazenda-dash">
        <div className="acoes-fazenda">
          <button
            className="gerar-rel"
            onClick={() => onAbrirRelFazenda?.(fazenda.id)}
          >
            <img src={relatorio} alt="" />
            Relatório
          </button>
          <button className="editar-fazenda" onClick={() => onEditarFazenda(fazenda.id)}>
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
                Temperatura
              </h3>
              <p>
                Baseada em medições <br />
                fictícias recentes
              </p>
            </div>
            <TemperatureGauge temperature={mediaTemp || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FazendaScreen;
