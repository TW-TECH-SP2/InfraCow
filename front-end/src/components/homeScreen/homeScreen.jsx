import "./homeScreen.css";
import logoBranca from "../../assets/logo-marrom-sem-slogan.png";
import cad from "../../assets/icons/add.svg";
import { useState, useEffect } from "react";

function HomeScreen({ onLogout, onCadastrarFazenda, onAbrirFazenda }) {
  const [fazendas, setFazendas] = useState([]);

  const fetchFazendas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado");
        return;
      }

      const response = await fetch("http://localhost:4000/fazendas", {
        method: "GET",
        headers: { autorizacao: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.log("Erro ao buscar fazendas");
      }

      const data = await response.json();
      setFazendas(data.fazendas || []);
    } catch (error) {
      console.log("Erro ao buscar fazendas", error);
    }
  };

  useEffect(() => {
    fetchFazendas();
  }, []);

  return (
    <div className="home-container">
      <div className="titulo-home">
        <h2>
          Bem vindo ao <br /> InfraCow
        </h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-home" />
      </div>
      <div className="cad-fazenda">
        <button
          onClick={onCadastrarFazenda}>
          <img src={cad} alt="add fazenda" /> Cadastrar nova fazenda
        </button>
      </div>
      {/* Renderizando os cards dinamicamente */}
      {fazendas.map((fazenda) => (
        <div className="card-fazenda" key={fazenda.id}>
          <div className="esquerda">
            <img 
              src={
                fazenda.imagem 
                  ? `http://localhost:4000/uploads/fazendas/${fazenda.imagem}` 
                  : '/default-fazenda.png'
              } 
              alt={fazenda.nome_fazenda} 
            />
          </div>
          <div className="direita">
            <div className="title-fazenda">
              <p>{fazenda.nome_fazenda}</p>
            </div>
            <div className="desc-fazenda">
              <p>
                {fazenda.rua}, {fazenda.numero} <br />
                {fazenda.bairro} - {fazenda.cidade} <br />
                CEP: {fazenda.CEP}
              </p>
            </div>
            <div className="gerenciar-fazenda">
              <button onClick={() => onAbrirFazenda(fazenda.id)}>Gerenciar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeScreen;