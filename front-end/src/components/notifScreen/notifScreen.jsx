import './notifScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import vaca from '../../assets/vaca.png';
function NotifScreen() {
  return (
    <div className="notif-container">
      <div className="titulo-notif">
        <h2>Notificações</h2>
        <img src={logoMarrom} alt="InfraCow Logo" className="logo-home" />
      </div>
      
      <div className="card-notif">
        <div className="esquerda-notif">
          <img src={vaca} alt="" />
          <button>Detalhes</button>
        </div>
        <div className="direita-notif">
          <p className="detalhes-notif">11:01 12/09 terça-feira</p>
          <p className="nome-vaca">Mimosa</p>
          <p className="desc-notif">Apresentou hiportemia em sua ultima medição! Procure um veterinário!</p>
          <button>Marcar como visto</button>
        </div>
      </div>
    </div>
  );
}

export default NotifScreen;