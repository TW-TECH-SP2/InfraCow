import './rebanhoScreen.css';
import logoBranca from '../../assets/logo-marrom-sem-slogan.png';

function RebanhoScreen({ onBack }) {
  return (
    <div className="rebanho-container">
      <div className="titulo-rebanho">
        <button onClick={onBack} className="back-button">← Voltar</button>
        <h2>Gerenciar Rebanho</h2>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-rebanho" />
      </div>
      <div className="rebanho-content">
        <p>Conteúdo do gerenciamento do rebanho aqui...</p>
        {/* Adicione aqui a lista de animais, formulários, etc. */}
      </div>
    </div>
  );
}

export default RebanhoScreen;