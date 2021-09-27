const Product = require('../models/Product');

// Para obter todos os produtos
exports.getProducts = async (req, res) => {
    try {
        const prod = await Product.find({});
        res.json({ products: prod });

    } catch (error) {
        res.json({ error: 'Algo deu errado' });
    }
}

// Obter um único produto
exports.getSingleProduct = async (req, res) => {
    const prodId = req.params.id;
    const prod = await Product.findById(prodId);

    if (prod) {
        res.json({ product: prod });
    } else {
        res.json({ message: 'Produto não encontrado' });
    }
}

// Criar um produto
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);

    if (product) {
        res.status(200).json({
            success: true,
            product: product
        })
    }
}