const Product = require('../models/Product');
require('../models/Category'); // Para fazer o preenchimento funcionar, já que o model 'Category' ainda não é usado em nenhum lugar
const CustomError = require('../utilities/CustomError');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

// Para obter todos os produtos
exports.getProducts = asyncMiddleware(async (req, res, next) => {

    // const prod = await Product.find({})
    //     .populate({
    //         path: 'category',
    //         select: 'titel'
    //     }); // Array de products

    // if (!prod) {
    //     const error = new CustomError('Algo deu errado, tente mais tarde', 500);
    //     res.status(error.statusCode).json({
    //         success: false,
    //         error: error.message
    //     });
    // }

    // res.status(200).json({
    //     success: true,
    //     count: prod.length,
    //     products: prod
    // });

    res.status(200).json(res.moreResults);
});

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
        });
    }
}