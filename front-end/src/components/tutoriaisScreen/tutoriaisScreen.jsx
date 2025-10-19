import './tutoriaisScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import play from '../../assets/icons/play.svg';

function TutoriaisScreen() {
  return (
    <div className="tuto-container">
      <div className="titulo-tuto">
        <h2>Tutorial</h2>
        <img src={logoMarrom} alt="InfraCow Logo" className="logo-home" />
      </div>

      <div className="desc-tuto">
        <p>Aprenda a manusear nosso<br />sistema por aqui!</p>
      </div>

      {/* Card de vídeo */}
      <div className="card-tuto">
        <div className="video-preview">
          <img src={play} alt="Play" className="play-icon" />
        </div>
        <div className="card-inferior">
          <p className="titulo-aula">Aula 01 - Cadastrando<br />sua Fazenda</p>
          <button className="btn-assistir">
            <img src={play} alt="" />
            Assistir
          </button>
        </div>
      </div>

      {/* Outro exemplo de card */}
      <div className="card-tuto">
        <div className="video-preview">
          <img src={play} alt="Play" className="play-icon" />
        </div>
        <div className="card-inferior">
          <p className="titulo-aula">Aula 02 - Adicionando<br />Animais</p>
          <button className="btn-assistir">
            <img src={play} alt="" />
            Assistir
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutoriaisScreen;
