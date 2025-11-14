import "./editFazendaScreen.css";
import logoMarrom from "../../assets/logo-marrom-sem-slogan.png";
import cameraIcon from "../../assets/icons/camera.svg";
import { useState, useEffect } from "react";
import axios from 'axios';

function EditFazendaScreen({id, onBack, onSave}) {
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

  useEffect(() => {
    const fetchFazenda = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado");
          return;
        }
        const response = await axios.get(`http://localhost:4000/fazendas/${id}`, {
          headers: { autorizacao: `Bearer ${token}` },
        });

        const data = response.data.fazenda;

        setFormData({
          nome_fazenda: data.nome_fazenda,
          rua: data.rua || "",
          bairro: data.bairro || "",
          cidade: data.cidade || "",
          CEP: data.CEP || "",
          numero: data.numero || "",
          imagem: null,
        });

        if (data.imagem) {
          setPreview(`http://localhost:4000/uploads/fazendas/${data.imagem}`);
        }
      } catch (error) {
        console.log("Erro ao buscar fazenda: ", error);
      }
    };
    if(id) fetchFazenda();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imagem: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.put(`http://localhost:4000/fazendas/${id}`, formDataToSend, {
        headers: { autorizacao: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert("Fazenda atualizada com sucesso!");
      if(onSave) onSave();
    } catch (error) {
      console.log("Erro ao atualizar fazenda", error);
      alert("Erro ao atualizar fazenda!");
    }
  };

  return (
    <div className="cad-fazenda-container">
      <div className="logo-cad">
        <img src={logoMarrom} alt="" />
      </div>
      <form onSubmit={handleSubmit} className="formcad">
        <div className="title-formcad">
          <h2>Edição de Fazenda</h2>
        </div>
        <div className="input-groupcad">
          <label>Nome da fazenda</label>
          <input
            type="text"
            name="nome_fazenda"
            value={formData.nome_fazenda}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label>Rua</label>
          <input
            type="text"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label>Bairro</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-groupcad">
          <label>Cidade</label>
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
            <label>CEP</label>
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
            <label>Número</label>
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
            {preview ? ( <img src={preview} alt="Preview" style={{ width: "100px", height: '100px', objectFit: 'cover' }} /> 
            ): ( <img src={cameraIcon} alt="Adicionar foto" /> )}
            <input type="file" name="imagem" onChange={handleFileChange}/>
          </div>
          <div className="direita">
            <p>Adicione uma foto de sua fazenda clicando na câmera.</p>
          </div>
        </div>
        <div className="btn-cadfazenda">
          <button type="submit" onClick={onSave}>Salvar Alterações</button>
          <button type="button" onClick={onBack}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default EditFazendaScreen;
