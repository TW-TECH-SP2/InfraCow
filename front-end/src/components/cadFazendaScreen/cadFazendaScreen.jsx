import './cadFazendaScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import cad from '../../assets/icons/add.svg';
import fazenda from '../../assets/fazendas/fazenda.png';

function CadFazendaScreen() {
  return (
        <div className="cad-fazenda-container">
            <div className="logo-cad">
                <img src={logoMarrom} alt="" />
            </div>
            <form action="">
                <div className="title-formcad">
                    <h2>Cadastro da Fazenda</h2>
                </div>
                <div className="input-groupcad">
                    <label htmlFor="">Nome da fazenda</label>
                    <input type="text" />
                </div>
                <div className="input-groupcad">
                    <label htmlFor="">Rua</label>
                    <input type="text" />
                </div>
                <div className="input-groupcad">
                    <label htmlFor="">Bairro</label>
                    <input type="text" />
                </div>
                <div className="input-groupcad">
                    <label htmlFor="">Cidade</label>
                    <input type="text" />
                </div>
                <div className="input-groupcad">
                    <label htmlFor="">CEP</label>
                    <input type="text" />
                </div>
                <div className="input-groupcad">
                    <label htmlFor="">Número</label>
                    <input type="number" />
                </div>
                <div className="input-cadimg">
                   <div className="esquerda-img-cad">
                    <input type="file" />
                   </div>
                   <div className="direita">
                    <p>Adicione uma foto de sua <br /> fazenda clicando na <br /> câmera.</p>
                   </div>
                </div>
                <div className="btn-cadfazenda">
                    <button type="submit">Cadastrar Fazenda</button>
                </div>
            </form>
        </div>
  );
}

export default CadFazendaScreen;