import './homeScreen.css';
import logoBranca from '../../assets/logo-marrom-sem-slogan.png';
import cad from '../../assets/icons/add.svg';
import fazenda from '../../assets/fazendas/fazenda.png';

function HomeScreen({onLogout, onCadastrarFazenda}) {
    console.log('🔍 HomeScreen - onCadastrarFazenda existe?', !!onCadastrarFazenda);
  return (
        <div className="home-container">
            <div className="titulo-home">
                <h2>Bem vindo ao <br /> InfraCow</h2>
                <img src={logoBranca} alt="InfraCow Logo" className="logo-home" />
            </div>
            <div className="cad-fazenda">
                <button onClick={() => {
          console.log('🖱️ Botão clicado!');
          onCadastrarFazenda();
        }}>
          <img src={cad} alt="add fazenda" /> Cadastrar nova Fazenda
        </button>
            </div>
            <div className="card-fazenda">
                <div className="esquerda">
                    <img src={fazenda} alt="" />
                </div>
                <div className="direita">
                    <div className="title-fazenda">
                        <p>Fazenda Recanto</p>
                    </div>
                    <div className="desc-fazenda">
                        <p>Estrada Rural do Ribeirão, km 12 <br /> Zona Rural –Cananéia/SP <br /> CEP: 11990-000</p>
                    </div>
                    <div className="gerenciar-fazenda">
                        <button>Gerenciar</button>
                    </div>
                </div>
            </div>
            <div className="card-fazenda">
                <div className="esquerda">
                    <img src={fazenda} alt="" />
                </div>
                <div className="direita">
                    <div className="title-fazenda">
                        <p>Fazenda Recanto</p>
                    </div>
                    <div className="desc-fazenda">
                        <p>Estrada Rural do Ribeirão, km 12 <br /> Zona Rural –Cananéia/SP <br /> CEP: 11990-000</p>
                    </div>
                    <div className="gerenciar-fazenda">
                        <button>Gerenciar</button>
                    </div>
                </div>
            </div>
            <div className="card-fazenda">
                <div className="esquerda">
                    <img src={fazenda} alt="" />
                </div>
                <div className="direita">
                    <div className="title-fazenda">
                        <p>Fazenda Recanto</p>
                    </div>
                    <div className="desc-fazenda">
                        <p>Estrada Rural do Ribeirão, km 12 <br /> Zona Rural –Cananéia/SP <br /> CEP: 11990-000</p>
                    </div>
                    <div className="gerenciar-fazenda">
                        <button>Gerenciar</button>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default HomeScreen;