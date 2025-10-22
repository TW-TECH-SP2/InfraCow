import './perfilScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import senha from '../../assets/icons/senha.svg';
import chat from '../../assets/icons/chat.svg';
import faq from '../../assets/icons/faq.svg';
import sideArrow from '../../assets/icons/side-arrow.svg';
import user from '../../assets/user.png';
import fazenda from '../../assets/fazendas/fazenda.png';
function PerfilScreen({ onEditarPerfil}) {
  return (
    <div className="perfil-container">
      <div className="titulo-perfil">
        <h2>Meu Perfil</h2>
        <img src={logoMarrom} alt="InfraCow Logo" className="logo-home" />
      </div>

      {/* Card de vídeo */}
      <div className="card-perfil">
        <div className="esquerda-perfil">
            <img src={user} alt="" />
        </div>
        <div className="direita-perfil">
            <p className="nome-perfil">André Silva</p>
            <p className='email-perfil'><strong> Email: </strong><br /> andre@gmail.com</p>
            <button onClick={onEditarPerfil}><img src={senha} alt="" />Editar info.</button>
        </div>
      </div>

      <div className="mini-fazendas">
        <h3>Minhas Fazendas</h3>
      </div>

      <div className="linha">
        <div className="card-fazenda-mini">
            <div className="superior-mini">
                <img src={fazenda} alt="" />
            </div>
            <div className="inferior-mini">
                <p>Fazenda Recanto</p>
                <button>Gerenciar</button>
            </div>
        </div>
        <div className="card-fazenda-mini">
            <div className="superior-mini">
                <img src={fazenda} alt="" />
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
        <button className='chat-ajuda-btn'><img src={chat} alt="" /> Converse com o suporte <img src={sideArrow} alt="" /></button>
        <button className='faq-ajuda-btn'><img src={faq} alt="" /> Perguntas frequentes <img src={sideArrow} alt="" /></button>
      </div>
    </div>
  );
}

export default PerfilScreen;
