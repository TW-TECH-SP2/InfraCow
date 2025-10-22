import './fazendaScreen.css';
import logoBranca from '../../assets/logo-marrom-sem-slogan.png';
import gerenciar from '../../assets/icons/gerenciar.svg';
import editDados from '../../assets/icons/edit-dados.svg';
import relatorio from '../../assets/icons/relatorio.svg';
import vacaqtd from '../../assets/icons/vaca-qtd.svg';
import { useEffect } from 'react';

function FazendaScreen({ onBack, onAbrirRebanho }) {
  const handleGerenciarAnimais = () => {
    console.log('🟢 Botão Gerenciar Animais clicado!');
    console.log('🟢 onAbrirRebanho:', onAbrirRebanho);
    
    if (onAbrirRebanho) {
      onAbrirRebanho();
    } else {
      console.log('❌ onAbrirRebanho não está definido!');
    }
  };

  return (
    <div className="fazenda-container">
      <div className="titulo-fazenda">
        <h2>Fazenda Recanto</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-fazenda" />
      </div>
        <div className="fazenda-dash">
            <div className="acoes-fazenda">
                <button className="gerar-rel"><img src={relatorio} alt="" />Relatório</button>
                <button className="editar-fazenda"><img src={editDados} alt="" />Edit. fazenda</button>
            </div>
            <div className="painel-qtd">
                <div className="esquerda-painel">
                    <div className="total-qtd">
                        <img src={vacaqtd} alt="" />
                        <p>Quant. <br />total de animais</p>
                        <h1>25</h1>
                    </div>
                </div>
                <div className="direita-painel">
                    <div className="cima-painel">
                        <div className="superior-cima">
                            <img src={vacaqtd} alt="" />
                            <p>Quant. fêmeas</p>
                        </div>
                        <div className="inferior-cima">
                            <h2>15</h2>
                        </div>
                        
                    </div>
                    <div className="baixo-painel">
                        <div className="superior-baixo">
                            <img src={vacaqtd} alt="" />
                            <p>Quant. machos</p>
                        </div>
                        <div className="inferior-baixo">
                            <h2>10</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="linha-fazenda">
                <button className="geren-animais" onClick={handleGerenciarAnimais}>
                  <img src={gerenciar} alt="" />Gerenciar Animais
                </button>
            </div>
            <div className="grafico-fazenda">
                <div className="grafico-card">
                    <h2>Media geral de temp</h2>
                    <p>grafico aqui</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FazendaScreen;