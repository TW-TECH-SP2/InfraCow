import './editFazendaScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import cameraIcon from '../../assets/icons/camera.svg';
function EditFazendaScreen({onBack}) {
  return (
        <div className="cad-fazenda-container">
            <div className="logo-cad">
                <img src={logoMarrom} alt="" />
            </div>
            <form action="" className='formcad'>
                <div className="title-formcad">
                    <h2>Edição de Fazenda</h2>
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
                <div className="input-groupcad-row">
                <div className="input-groupcad">
                    <label htmlFor="">CEP</label>
                    <input type="text" placeholder="Ex.: 1900-000" />
                </div>
                <div className="input-groupcad">
                    <label htmlFor="">Número</label>
                    <input type="number" placeholder="Ex.: 135" />
                </div>
                </div>
                <div className="input-cadimg">
                   <div className="esquerda-img-cad">
                        <img src={cameraIcon} alt="Adicionar foto" />
                        <input type="file" />
                    </div>
                   <div className="direita">
                    <p>Adicione uma foto de sua fazenda clicando na câmera.</p>
                   </div>
                </div>
                <div className="btn-cadfazenda">
                    <button type="submit">Cadastrar Fazenda</button>
                </div>
            </form>
        </div>
  );
}

export default EditFazendaScreen;