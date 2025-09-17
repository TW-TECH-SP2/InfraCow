import medicoesService from "../Services/medicoesService.js";

const Postar = async (req,res)=>{
    const {temperatura} = req.body;
    try{
        await medicoesService.create(temperatura)
        req.status(201).json({message:"Medida Postada"})

    }catch(error){
        res.status(500).json({error:"ERRO INTERNO DE SERVER"})
    }
}
const LerDados = async (req,res)=>{
    try {
        const medidas = await medicoesService.getAll();
        res.status(200).json(medidas);
    } catch (error) {
        res.status(500).json({error:"ERRO INTERNO DE SERVER"})
    }
}
export default {Postar,LerDados}