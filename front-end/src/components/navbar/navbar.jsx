import './navbar.css';
import homeIcon from '../../assets/icons/home.png';
import homeActive from '../../assets/icons/home-active.png';
import tutoriaisIcon from '../../assets/icons/tutoriais.png';
import tutoriaisActive from '../../assets/icons/tutoriais-active.png';
import perfilIcon from '../../assets/icons/perfil.png';
import perfilActive from '../../assets/icons/perfil-active.png';
import notificacoesIcon from '../../assets/icons/notif.png';
import notificacoesActive from '../../assets/icons/notif-active.png';

function Navbar({ activeTab, onTabChange }) {
  // Função para pegar o ícone correto baseado no estado
  const getIcon = (tabName) => {
    const icons = {
      home: activeTab === 'home' ? homeActive : homeIcon,
      tutoriais: activeTab === 'tutoriais' ? tutoriaisActive : tutoriaisIcon,
      perfil: activeTab === 'perfil' ? perfilActive : perfilIcon,
      notificacoes: activeTab === 'notificacoes' ? notificacoesActive : notificacoesIcon,
    };
    return icons[tabName];
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button 
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange('home')}
        >
          <img src={getIcon('home')} alt="Home" />
        </button>
        
        <button 
          className={`nav-link ${activeTab === 'tutoriais' ? 'active' : ''}` }
          onClick={() => onTabChange('tutoriais')}
        >
          <img src={getIcon('tutoriais')} alt="Tutoriais" />
        </button>
        
        <button 
          className={`nav-link ${activeTab === 'perfil' ? 'active' : ''}`}
          onClick={() => onTabChange('perfil')}
        >
          <img src={getIcon('perfil')} alt="Perfil" />
        </button>
        
        <button 
          className={`nav-link ${activeTab === 'notificacoes' ? 'active' : ''}`}
          onClick={() => onTabChange('notificacoes')}
        >
          <img src={getIcon('notificacoes')} alt="Notificações" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;