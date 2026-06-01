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

export const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const produto = await productModels.buscarProdutoPorId(productId);

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        return res.status(200).json(produto);

    } catch (err) {
        console.error("Erro ao buscar produto por ID:", err);
        return res.status(500).json({ message: "Erro interno ao buscar o produto." });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nome, preco, descricao, quantidade } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "A imagem do produto é obrigatória!" });
        }

        const nomeImagemSalva = req.file.filename; 

        if (!nome || !preco || !quantidade) {
            return res.status(400).json({ message: "Campos obrigatórios ausentes!" });
        }

        const resultado = await productModels.salvarProduto({
            nome,
            preco: parseFloat(preco),
            descricao,
            quantidade: parseInt(quantidade),
            imagem: nomeImagemSalva
        });

        return res.status(201).json({ message: "Produto cadastrado com sucesso!", id: resultado.insertId });

    } catch (err) {
        console.error("Erro no cadastro de produto:", err);
        return res.status(500).json({ message: "Erro interno ao salvar o produto." });
    }
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await productModels.deletarProduto(productId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produto não encontrado para exclusão." });
        }

        return res.status(200).json({ message: "Produto excluído com sucesso!" });

    } catch (err) {
        console.error("Erro ao deletar produto:", err);
        return res.status(500).json({ message: "Erro interno ao excluir o produto." });
    }
};

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { nome, preco, quantidade, descricao } = req.body;

    if (!nome || preco === undefined || quantidade === undefined) {
        return res.status(400).json({ message: "Os campos Nome, Preço e Quantidade são obrigatórios." });
    }

    try {
        const dadosAtualizados = { nome, preco, quantidade, descricao };
        
        const atualizado = await productModels.atualizarProduto(productId, dadosAtualizados);

        if (!atualizado) {
            return res.status(404).json({ message: "Produto não encontrado para atualização." });
        }

        return res.status(200).json({ message: "Produto atualizado com sucesso!" });

    } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        return res.status(500).json({ message: "Erro interno ao atualizar o produto." });
    }
};