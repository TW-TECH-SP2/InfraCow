import './perfilScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import senha from '../../assets/icons/senha.svg';

function PerfilScreen() {
  return (
    <div className="perfil-container">
      <div className="titulo-perfil">
        <h2>Tutorial</h2>
        <img src={logoMarrom} alt="InfraCow Logo" className="logo-home" />
      </div>

      {/* Card de vídeo */}
      <div className="card-perfil">
        <div className="esquerda-perfil">
            <img src="" alt="" />
        </div>
        <div className="direita-perfil">
            <p className="nome-perfil">André Silva</p>
            <p className='email-perfil'>Email: <br /> andre@gmail.com</p>
            <button><img src={senha} alt="" />Mudar senha</button>
        </div>
      </div>

      <div className="mini-fazendas">
        <h3>Minhas Fazendas</h3>
      </div>

      <div className="linha">
        <div className="card-fazenda-mini">
            <div className="superior-mini">
                <img src="" alt="" />
            </div>
            <div className="inferior-mini">
                <p>Fazenda Recanto</p>
                <button>Gerenciar</button>
            </div>
        </div>
        <div className="card-fazenda-mini">
            <div className="superior-mini">
                <img src="" alt="" />
            </div>
            <div className="inferior-mini">
                <p>Fazenda Recanto</p>
                <button>Gerenciar</button>
            </div>
        </div>
      </div>
      <div className="ajuda-perfil">
        <h3>Ajuda</h3>
      </div>
      <div className="ajuda-section">
        <div className="superior-ajuda">
            Converse com o suporte
        </div>
        <div className="inferior-ajuda">
            Perguntas frequentes
        </div>
      </div>
    </div>
  );
}

export default PerfilScreen;
