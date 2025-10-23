import './relFazendaScreen.css';
import exit from '../../assets/icons/exit.svg';
import share from '../../assets/icons/share.svg';
import downloadrel from '../../assets/icons/download-rel.svg';

function RelFazendaScreen({ onBack, onVoltarFazenda }) {
  return (
    <div className="relfazenda-container">
      <div className="acoes-visu">
        <img src={exit} alt="Voltar" onClick={onVoltarFazenda} />
        <img src={share} alt="Compartilhar" />
      </div>
      <div className="corpo-pdf">
        <div className="relatorio-conteudo">
          <h1>Relatório da fazenda: Recanto</h1>
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </p>
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </p>

          {/* Adicione mais parágrafos para testar a rolagem */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        
        {/* Botão fixo na parte inferior */}
        <button className="botao-download-fixo">
          <img src={downloadrel} alt="Download" />
          Baixar arquivo
        </button>
      </div>
    </div>
  );
}

export default RelFazendaScreen;