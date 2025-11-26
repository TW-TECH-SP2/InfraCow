import "./homeScreen.css";
import logoBranca from "../../assets/logo-marrom-sem-slogan.png";
import cad from "../../assets/icons/add.svg";
import fazendaImg from "../../assets/fazendas/fazenda.png";
import { useState, useEffect } from "react";

function HomeScreen({ onLogout, onCadastrarFazenda, onAbrirFazenda }) {
  // Mock de fazenda única
  const [fazendas] = useState([
    {
      id: 1,
      nome_fazenda: "Fazenda Recanto",
      rua: "Estrada Principal",
      numero: "S/N",
      bairro: "Zona Rural",
      cidade: "Campo Verde",
      CEP: "00000-000",
      imagem: null
    }
  ]);

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
            <img src={fazendaImg} alt={fazenda.nome_fazenda} />
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