import medicoes from "../Models/medicoes.js";
class medicoesService {
    async getAll(){
        try{
            const medidas = await medicoes.findAll()
            return medidas;

        }catch(error){
            console.log("Erro ao buscar medidas",error);

        }
    }
    async create(temperatura){
        try {
            const newMedida = await medicoes.create({temperatura})
            return newMedida
        } catch (error) {
            console.log("Erro ao criar medida",error)
        }

    }

}

export default new medicoesService();