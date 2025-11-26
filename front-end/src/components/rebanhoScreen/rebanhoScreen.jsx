import { useState, useEffect } from "react";
import "./rebanhoScreen.css";
import logoBranca from "../../assets/logo-marrom-sem-slogan.png";
import cad from "../../assets/icons/add.svg";
import vacaImg from "../../assets/vaca.png";
import arrowdown from "../../assets/icons/arrow-down.svg";
import trash from "../../assets/icons/delete.svg";
import editDados from "../../assets/icons/edit-dados.svg";

function RebanhoScreen({
  onBack,
  onEditarAnimal,
  onCadastrarAnimal,
  onAbrirAnimal,
}) {
  // Cartões estáticos: removido estado de expansão
  const [animais, setAnimais] = useState([]);
  const [medicoes, setMedicoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dados fictícios (mock) substituindo chamadas reais à API
    const mockAnimais = [
      { id: 1, nome_animal: 'Mimosa', genero: 'F', raca: 'Holandesa', peso: 610, idade: 4, tipo: 'leiteiro', imagem: null },
      { id: 2, nome_animal: 'Thor', genero: 'M', raca: 'Angus', peso: 720, idade: 5, tipo: 'corte', imagem: null },
      { id: 3, nome_animal: 'Estrela', genero: 'F', raca: 'Jersey', peso: 500, idade: 3, tipo: 'leiteiro', imagem: null },
      { id: 4, nome_animal: 'Brutus', genero: 'M', raca: 'Nelore', peso: 800, idade: 6, tipo: 'reprodutor', imagem: null },
      { id: 5, nome_animal: 'Lua', genero: 'F', raca: 'Girolando', peso: 580, idade: 2, tipo: 'leiteiro', imagem: null },
    ];
    // Medições fictícias (últimas 24 horas de hora em hora)
    const now = Date.now();
    const mockMedicoes = mockAnimais.flatMap(a => {
      return Array.from({ length: 8 }).map((_, i) => ({
        animais_id: a.id,
        temperatura: (36.5 + Math.random() * 2).toFixed(1),
        datahora: new Date(now - i * 60 * 60 * 1000).toISOString(),
      }));
    });
    setAnimais(mockAnimais);
    setMedicoes(mockMedicoes);
    setLoading(false);
  }, []);

  // Removido comportamento de expandir/contrair

  const handleEditarAnimalClick = (animalId) => {
    if (onEditarAnimal) {
      onEditarAnimal(animalId);
    }
  };

  const handleCadastrarAnimalClick = () => {
    if (onCadastrarAnimal) {
      onCadastrarAnimal();
    }
  };
  const handleAbrirAnimalClick = (animalId) => {
    if (onAbrirAnimal) {
      onAbrirAnimal(animalId);
    }
  };

  const getMedicao = (animalId) => {
    const medicoesAnimal = medicoes
      .filter((m) => m.animais_id === animalId)
      .sort((a, b) => new Date(b.datahora) - new Date(a.datahora));
    return medicoesAnimal[0] || null;
  };

  if (loading) {
    return (
      <div className="rebanho-container">
        <p>Carregando animais...</p>
      </div>
    );
  }

  const handleExcluirAnimal = async (animalId) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este animal?"
    );
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Usuário não autenticado");
        return;
      }

      const resposta = await fetch(
        `${import.meta.env.VITE_API_URL}/animais/${animalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            autorizacao: `Bearer ${token}`,
          },
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir animal");
      }
      setAnimais((prev) => prev.filter((a) => a.id !== animalId));
      alert("Animal excluído com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir animal:", erro);
      alert("Não foi possível excluir o animal.");
    }
  };

  return (
    <div className="rebanho-container">
      <div className="titulo-rebanho">
        <h2>
          Rebanho da <br /> Fazenda Recanto
        </h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-rebanho" />
      </div>

      <div className="cad-rebanho">
        <button onClick={onCadastrarAnimal}>
          <img src={cad} alt="add fazenda" /> Cadastrar novo animal
        </button>
      </div>

      <div className="rebanho-list">
        {animais.map((a, index) => {
          const ultimaMedicao = getMedicao(a.id);
          return (
            <div className="rebanho-card-row" key={a.id}>
              <div className="rebanho-card static">
                <div className="rebanho-card-cima">
                  <div className="rebanho-card-esquerda">
                    <img src={vacaImg} alt={a.nome_animal} />
                  </div>
                  <div className="rebanho-card-direita">
                    <p className="nome-animal-card">{a.nome_animal}</p>
                  </div>
                </div>
                <div className="rebanho-card-baixo">
                  <div className="rebanho-card-esquerda">
                    <p><strong>Nome:</strong> {a.nome_animal}</p>
                    <p><strong>Gênero:</strong> {a.genero}</p>
                    <p><strong>Raça:</strong> {a.raca}</p>
                    <p><strong>Peso:</strong> {a.peso}</p>
                    <p><strong>Idade:</strong> {a.idade}</p>
                    <p><strong>Tipo:</strong> {a.tipo}</p>
                    {ultimaMedicao && (
                      <>
                        <p><strong>Temperatura:</strong> {ultimaMedicao.temp}</p>
                        <p><strong>Data/Hora:</strong> {new Date(ultimaMedicao.datahora).toLocaleString()}</p>
                      </>
                    )}
                  </div>
                  <div className="rebanho-card-direita">
                    <button onClick={() => handleAbrirAnimalClick(a.id)}>Dados</button>
                  </div>
                </div>
              </div>

              <div className="rebanho-card-actions">
                <button
                  className="editar-animal"
                  onClick={() => handleEditarAnimalClick(a.id)}
                >
                  <img src={editDados} alt="" />
                </button>
                <button
                  className="delete-animal"
                  onClick={() => handleExcluirAnimal(a.id)}
                >
                  <img src={trash} alt="Excluir animal" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RebanhoScreen;
