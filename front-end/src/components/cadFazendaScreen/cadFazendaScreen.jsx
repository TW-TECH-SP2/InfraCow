import "./cadFazendaScreen.css";
import logoMarrom from "../../assets/logo-marrom-sem-slogan.png";
import cameraIcon from "../../assets/icons/camera.svg";
import { useState } from "react";

function CadFazendaScreen({onBack}) {
  const [formData, setFormData] = useState({
    nome_fazenda: "",
    rua: "",
    bairro: "",
    cidade: "",
    CEP: "",
    numero: "",
    imagem: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imagem: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Usuário não autenticado");
        return;
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/fazendas`, {
        method: "POST",
        headers: {
          autorizacao: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        console.log("Erro ao cadastrar fazenda");
      }

      alert("Fazenda cadastrada com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar fazenda");
    }
  };

  return (
    <div className="cad-fazenda-container">
      <div className="logo-cad">
        <img src={logoMarrom} alt="" />
      </div>
      <form onSubmit={handleSubmit} className="formcad">
        <div className="title-formcad">
          <h2>Cadastro da Fazenda</h2>
        </div>
        <div className="input-groupcad">
          <label htmlFor="">Nome da fazenda</label>
          <input
            type="text"
            name="nome_fazenda"
            value={formData.nome_fazenda}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label htmlFor="">Rua</label>
          <input
            type="text"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label htmlFor="">Bairro</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label htmlFor="">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad-row">
          <div className="input-groupcad">
            <label htmlFor="">CEP</label>
            <input
              type="text"
              placeholder="Ex.: 1900-000"
              name="CEP"
              value={formData.CEP}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-groupcad">
            <label htmlFor="">Número</label>
            <input
              type="number"
              placeholder="Ex.: 135"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="input-cadimg">
          <div className="esquerda-img-cad">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <img src={cameraIcon} alt="Adicionar foto" />
            )}
            <input type="file" name="imagem" onChange={handleFileChange} />
          </div>
          <div className="direita">
            <p>Adicione uma foto de sua fazenda clicando na câmera.</p>
          </div>
        </div>
        <div className="btn-cadfazenda">
          <button type="submit">Cadastrar Fazenda</button>
          <button type="button" onClick={onBack}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default CadFazendaScreen;
