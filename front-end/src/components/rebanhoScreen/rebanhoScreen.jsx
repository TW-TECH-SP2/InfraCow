import { useState, useEffect } from "react";
import "./rebanhoScreen.css";
import logoBranca from "../../assets/logo-marrom-sem-slogan.png";
import cad from "../../assets/icons/add.svg";
import animal from "../../assets/vaca.png";
import arrowdown from "../../assets/icons/arrow-down.svg";
import trash from "../../assets/icons/delete.svg";
import editDados from "../../assets/icons/edit-dados.svg";

function RebanhoScreen({
  onBack,
  onEditarAnimal,
  onCadastrarAnimal,
  onAbrirAnimal,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [animais, setAnimais] = useState([]);
  const [medicoes, setMedicoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Usuário não autenticado");
          setLoading(false);
          return;
        }

        const [animaisRes, medicoesRes] = await Promise.all([
          fetch("http://localhost:4000/animais", {
            headers: { autorizacao: `Bearer ${token}` },
          }),
          fetch("http://localhost:4000/medicoes", {
            headers: { autorizacao: `Bearer ${token}` },
          }),
        ]);

        const animaisData = await animaisRes.json();
        const medicoesData = await medicoesRes.json();

        setAnimais(
          Array.isArray(animaisData) ? animaisData : animaisData.animais || []
        );
        setMedicoes(
          Array.isArray(medicoesData)
            ? medicoesData
            : medicoesData.medicoes || []
        );
      } catch (error) {
        console.log("Erro ao buscar animais: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimais();
  }, []);

  const toggleCard = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
        {animais.length === 0 ? (
          <p>Nenhum animal cadastrado ainda</p>
        ) : (
          animais.map((a, index) => {
            const ultimaMedicao = getMedicao (a.id);
            return (
              <div className="rebanho-card-row" key={a.id}>
                <div
                  className={`rebanho-card ${
                    expandedIndex === index ? "expanded" : ""
                  }`}
                  onClick={() => toggleCard(index)}
                >
                  <div className="rebanho-card-cima">
                    <div className="rebanho-card-esquerda">
                      <img
                        src={
                          a.imagem
                            ? `http://localhost:4000/uploads/animais/${a.imagem}`
                            : animalImg
                        }
                        alt=""
                      />
                    </div>

                    <div className="rebanho-card-direita">
                      <p className="nome-animal-card">{a.nome_animal}</p>
                    </div>

                    <img
                      src={arrowdown}
                      alt=""
                      className={`arrow-card ${
                        expandedIndex === index ? "rotated" : ""
                      }`}
                    />
                  </div>

                  {expandedIndex === index && (
                    <div className="rebanho-card-baixo">
                      <div className="rebanho-card-esquerda">
                        <p>
                          <strong>Nome:</strong> {a.nome_animal}
                        </p>
                        <p>
                          <strong>Gênero:</strong> {a.genero}
                        </p>
                        <p>
                          <strong>Raça:</strong> {a.raca}
                        </p>
                        <p>
                          <strong>Peso:</strong> {a.peso}
                        </p>
                        <p>
                          <strong>Idade:</strong> {a.idade}
                        </p>
                        <p>
                          <strong>Tipo:</strong> {a.tipo}
                          {ultimaMedicao && (
                          <>
                            <p><strong>Temperatura:</strong> {ultimaMedicao.temp}</p>
                            <p> <strong>Data/Hora:</strong>
                              {" "}
                              {new Date(
                                ultimaMedicao.datahora
                              ).toLocaleString()}
                            </p>
                          </>
                        )}
                        </p>
                      </div>

                      <div className="rebanho-card-direita">
                        <button onClick={() => handleAbrirAnimalClick(a.id)}>
                          Dados
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="rebanho-card-actions">
                  <button
                    className="editar-animal"
                    onClick={() => handleEditarAnimalClick(a.id)}
                  >
                    <img src={editDados} alt="" />
                  </button>
                  <button className="delete-animal">
                    <img src={trash} alt="" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RebanhoScreen;