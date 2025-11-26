import "./cadFazendaScreen.css";
import logoMarrom from "../../assets/logo-marrom-sem-slogan.png";
import cameraIcon from "../../assets/icons/camera.svg";
import exit from "../../assets/icons/exit.svg";
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

      console.log("📤 Enviando dados da fazenda...");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/fazendas`, {
        method: "POST",
        headers: {
          autorizacao: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("❌ Erro ao cadastrar fazenda:", errorData);
        alert("Erro ao cadastrar fazenda");
        return;
      }

      const data = await response.json();
      console.log("✅ Fazenda cadastrada:", data);
      
      alert("Fazenda cadastrada com sucesso!");
      
      // Voltar para a tela anterior após sucesso
      if (onBack) {
        onBack();
      }
    } catch (error) {
      console.log("❌ Erro na requisição:", error);
      alert("Erro ao cadastrar fazenda");
    }
  };

  return (
    <div className="cad-fazenda-container">
      <div className="header-cad-fazenda">
        <img src={exit} alt="Voltar" onClick={onBack} className="exit-icon" />
        <img src={logoMarrom} alt="Logo" className="logo-cad" />
      </div>
      <form onSubmit={handleSubmit} className="formcad">
        <div className="title-formcad">
          <h2>Cadastro da Fazenda</h2>
        </div>
        <div className="input-groupcad">
          <label htmlFor="nome_fazenda">Nome da fazenda</label>
          <input
            id="nome_fazenda"
            type="text"
            name="nome_fazenda"
            value={formData.nome_fazenda}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label htmlFor="rua">Rua</label>
          <input
            id="rua"
            type="text"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad-row">
          <div className="input-groupcad">
            <label htmlFor="CEP">CEP</label>
            <input
              id="CEP"
              type="text"
              placeholder="Ex.: 1900-000"
              name="CEP"
              value={formData.CEP}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-groupcad">
            <label htmlFor="numero">Número</label>
            <input
              id="numero"
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
        </div>
      </form>
    </div>
  );
}

export default CadFazendaScreen;
