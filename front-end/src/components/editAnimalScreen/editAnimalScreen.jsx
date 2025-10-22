import './editAnimalScreen.css';
import logoMarrom from '../../assets/logo-marrom-sem-slogan.png';
import cameraIcon from '../../assets/icons/camera.svg';

function EditAnimalScreen({ onBack }) {
  return (
    <div className="cad-fazenda-container">
      <div className="logo-cad">
        <img src={logoMarrom} alt="" />
      </div>

      <form action="" className="formcad">
        <div className="title-formcad">
          <h2>Edição de Animal</h2>
        </div>

        <div className="input-groupcad">
          <label htmlFor="nome">Nome do animal</label>
          <input type="text" id="nome" />
        </div>

        <div className="input-groupcad">
          <label htmlFor="genero">Gênero</label>
          <select id="genero">
            <option value="">Selecione o gênero</option>
            <option value="femea">Fêmea</option>
            <option value="macho">Macho</option>
          </select>
        </div>

        <div className="input-groupcad">
          <label htmlFor="tipo">Tipo</label>
          <select id="tipo">
            <option value="">Selecione o tipo</option>
            <option value="leiteiro">Leiteiro</option>
            <option value="corte">De corte</option>
            <option value="reprodutor">Reprodutor</option>
          </select>
        </div>

        <div className="input-groupcad">
          <label htmlFor="raca">Raça</label>
          <input type="text" id="raca" />
        </div>

        <div className="input-groupcad-row">
          <div className="input-groupcad">
            <label htmlFor="peso">Peso</label>
            <input type="text" id="peso" placeholder="Ex.: 600" />
          </div>
          <div className="input-groupcad">
            <label htmlFor="idade">Idade (em anos)</label>
            <input type="number" id="idade" placeholder="Ex.: 2" />
          </div>
        </div>

        <div className="input-cadimg">
          <div className="esquerda-img-cad">
            <img src={cameraIcon} alt="Adicionar foto" />
            <input type="file" />
          </div>
          <div className="direita">
            <p>Adicione uma foto de seu animal clicando na câmera.</p>
          </div>
        </div>

        <div className="btn-cadfazenda">
          <button type="submit">Salvar alterações</button>
        </div>
      </form>
    </div>
  );
}

export default EditAnimalScreen;
