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
    
    console.log("🚀 handleSubmit iniciado");
    console.log("📋 FormData atual:", formData);

    try {
      const token = localStorage.getItem("token");
      console.log("🔑 Token:", token ? "Token encontrado" : "Token não encontrado");

      if (!token) {
        alert("Usuário não autenticado");
        return;
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        console.log(`➕ Adicionando campo: ${key} = ${formData[key]}`);
        formDataToSend.append(key, formData[key]);
      });

      const apiUrl = `${import.meta.env.VITE_API_URL}/fazendas`;
      console.log("📤 Enviando para:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          autorizacao: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      console.log("📥 Status da resposta:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("❌ Erro ao cadastrar fazenda:", errorData);
        alert(`Erro ao cadastrar fazenda: ${errorData.error || "Erro desconhecido"}`);
        return;
      }

      const data = await response.json();
      console.log("✅ Fazenda cadastrada:", data);
      
      alert("Fazenda cadastrada com sucesso!");
      
      // Voltar para a tela anterior após sucesso
      if (onBack) {
        console.log("🔙 Voltando para tela anterior");
        onBack();
      }
    } catch (error) {
      console.log("❌ Erro na requisição:", error);
      alert(`Erro ao cadastrar fazenda: ${error.message}`);
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
          <label htmlFor="imagem" className="esquerda-img-cad">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <img src={cameraIcon} alt="Adicionar foto" />
            )}
            <input 
              id="imagem"
              type="file" 
              name="imagem" 
              onChange={handleFileChange} 
            />
          </label>
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
