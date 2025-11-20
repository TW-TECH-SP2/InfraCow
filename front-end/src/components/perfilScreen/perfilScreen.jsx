import './perfilScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import senha from '../../assets/icons/senha.svg';
import chat from '../../assets/icons/chat.svg';
import faq from '../../assets/icons/faq.svg';
import sideArrow from '../../assets/icons/side-arrow.svg';
import user from '../../assets/user.png';
import fazenda from '../../assets/fazendas/fazenda.png';
import { useState, useEffect } from 'react';
import axios from 'axios'

function PerfilScreen({ onEditarPerfil}) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado");
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios/me`, {
          headers: { autorizacao: `Bearer ${token}` },
        })

        setUsuario(response.data.usuario);
      } catch (error) {
        console.log("Erro ao carregar usuário: ", error);
        alert("Erro ao buscar dados do perfil!");
      }
    }
    fetchUsuario();
  }, []);


  return (
    <div className="perfil-container">
      <div className="titulo-perfil">
        <h2>Meu Perfil</h2>
        <img src={logoMarrom} alt="InfraCow Logo" className="logo-home" />
      </div>

      {/* Card de vídeo */}
      <div className="card-perfil">
        <div className="esquerda-perfil">
            <img src={user} alt="Foto do usuário" />
        </div>
        <div className="direita-perfil">
            <p className="nome-perfil">{usuario ? usuario.nome : 'Carregando...'}</p>
            <p className='email-perfil'><strong> Email: </strong><br /> {usuario ? usuario.email : 'Carregando...'}</p>
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
