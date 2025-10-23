import { useState } from 'react';
import './rebanhoScreen.css';
import logoBranca from '../../assets/logo-marrom-sem-slogan.png';
import cad from '../../assets/icons/add.svg';
import animal from '../../assets/vaca.png';
import arrowdown from '../../assets/icons/arrow-down.svg';
import trash from '../../assets/icons/delete.svg';
import editDados from '../../assets/icons/edit-dados.svg';

function RebanhoScreen({ onBack, onEditarAnimal, onCadastrarAnimal, onAbrirAnimal   }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // dps puxa do banco
  const animais = [
    { nome: 'Mimosa', genero: 'Fêmea', numero: 169, idade: '2 anos', peso: '200 Kg', tipo: 'Leiteira' },
    { nome: 'Thor', genero: 'Macho', numero: 202, idade: '3 anos', peso: '350 Kg', tipo: 'Corte' },
  ];

  const toggleCard = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  const handleEditarAnimalClick = () => {
    console.log('🟡 Botão Editar Animal clicado!');
    if (onEditarAnimal) {
      onEditarAnimal();
    }
  };

  const handleCadastrarAnimalClick = () => {
    console.log('🟢 Botão Cadastrar Animal clicado!');
    if (onCadastrarAnimal) {
      onCadastrarAnimal();
    }
  };
    const handleAbrirAnimalClick = () => {
    console.log('🔵 Botão Dados do Animal clicado!');
    if (onAbrirAnimal) {
      onAbrirAnimal();
    }
  };

  return (
    <div className="rebanho-container">
      <div className="titulo-rebanho">
        <h2>Rebanho da <br /> Fazenda Recanto</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-rebanho" />
      </div>

      <div className="cad-rebanho">
        <button onClick={onCadastrarAnimal }>
          <img src={cad} alt="add fazenda" /> Cadastrar novo animal
        </button>
      </div>

      <div className="rebanho-list">
        {animais.map((a, index) => (
          <div className="rebanho-card-row" key={index}>
            <div
              className={`rebanho-card ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => toggleCard(index)}
            >
              <div className="rebanho-card-cima">
                <div className="rebanho-card-esquerda">
                  <img src={animal} alt="" />
                </div>

                <div className="rebanho-card-direita">
                  <p className="nome-animal-card">{a.nome}</p>
                  <p className='genero-animal'>{a.genero}</p>
                </div>

                <img
                  src={arrowdown}
                  alt=""
                  className={`arrow-card ${expandedIndex === index ? 'rotated' : ''}`}
                />
              </div>

              {expandedIndex === index && (
                <div className="rebanho-card-baixo">
                  <div className="rebanho-card-esquerda">
                    <p><strong>Numeração:</strong> {a.numero}</p>
                    <p><strong>Idade:</strong> {a.idade}</p>
                    <p><strong>Peso:</strong> {a.peso}</p>
                    <p><strong>Tipo:</strong> {a.tipo}</p>
                  </div>
                  <div className="rebanho-card-direita">
                    <button onClick={onAbrirAnimal }>Dados</button>
                  </div>
                </div>
              )}
            </div>

            <div className="rebanho-card-actions">
              <button className="editar-animal" onClick={onEditarAnimal }>
                <img src={editDados} alt="" />
              </button>
              <button className="delete-animal">
                <img src={trash} alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RebanhoScreen;
