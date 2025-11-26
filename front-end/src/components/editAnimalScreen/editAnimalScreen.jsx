import "./editAnimalScreen.css";
import logoMarrom from "../../assets/logo-marrom-sem-slogan.png";
import cameraIcon from "../../assets/icons/camera.svg";
import exit from "../../assets/icons/exit.svg";
import { useState, useEffect } from "react";
import axios from "axios";

function EditAnimalScreen({ id, onBack, onSave }) {
  const [formData, setFormData] = useState({
    nome_animal: "",
    codigo: "",
    genero: "",
    tipo: "",
    raca: "",
    peso: "",
    idade: "",
    imagem: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado!");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/animais/${id}`,
          {
            headers: { autorizacao: `Bearer ${token}` },
          }
        );

        const data = response.data.animal;

        setFormData({
          nome_animal: data.nome_animal || "",
          codigo: data.codigo || "",
          genero: data.genero || "",
          tipo: data.tipo || "",
          raca: data.raca || "",
          peso: data.peso || "",
          idade: data.idade || "",
          imagem: null,
        });

        if (data.imagem) {
          setPreview(`${import.meta.env.VITE_API_URL}/uploads/animais/${data.imagem}`);
        }
      } catch (error) {
        console.error("Erro ao buscar animal:", error);
        alert("Erro ao carregar dados do animal!");
      }
    };

    if (id) fetchAnimal();
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

      await axios.put(`${import.meta.env.VITE_API_URL}/animais/${id}`, formDataToSend, {
        headers: {
          autorizacao: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Animal atualizado com sucesso!");
      if (onSave) onSave();
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      alert("Erro ao atualizar animal!");
    }
  };

  return (
    <div className="cad-animal-container">
      <div className="header-cad-fazenda">
        <img src={exit} alt="Voltar" onClick={onBack} className="exit-icon" />
        <img src={logoMarrom} alt="Logo" className="logo-cad" />
      </div>

      <form onSubmit={handleSubmit} className="formcad">
        <div className="title-formcad">
          <h2>Edição de Animal</h2>
        </div>

        <div className="input-groupcad">
          <label>Nome do animal</label>
          <input
            type="text"
            name="nome_animal"
            value={formData.nome_animal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad">
          <label>Código</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad">
          <label>Gênero</label>
          <select
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
          <option value="">Selecione...</option>
          <option value="M">Macho</option>
          <option value="F">Fêmea</option>
          </select>
        </div>

        <div className="input-groupcad">
          <label>Tipo</label>
          <select
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
          <option value="">Selecione...</option>
          <option value="corte">Corte</option>
          <option value="leiteiro">Leiteiro</option>
          <option value="reproducao">Reprodução</option>
          </select>
        </div>

        <div className="input-groupcad">
          <label>Raça</label>
          <input
            type="text"
            name="raca"
            value={formData.raca}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad">
          <label>Peso</label>
          <input
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="input-groupcad">
          <label>Idade</label>
          <input
            type="text"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-cadimg">
          <div className="esquerda-img-cad">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <img src={cameraIcon} alt="Adicionar foto" />
            )}
            <input type="file" name="imagem" onChange={handleFileChange} />
          </div>
          <div className="direita">
            <p>Adicione uma foto do animal clicando na câmera.</p>
          </div>
        </div>

        <div className="btn-cadfazenda">
          <button type="submit" onClick={onSave}>Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
}

export default EditAnimalScreen;
