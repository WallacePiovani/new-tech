    import * as productModels from '../models/productModels.js';


    export const getProduct = async (req, res) =>{
        const produtoPesquisa = req.query['term-search'] || '';
        try{
            const result = await productModels.buscarProduto(produtoPesquisa || '');
            if (result.length == 0){
                return res.status(404).json({message: "Produto não localizado!"})
            }
            return res.status(200).json(result);
        }
        catch(err){
            return res.status(500).json({message: "Erro interno no servidor!"})
        }
    }