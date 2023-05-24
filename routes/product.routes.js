
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model.js");


router.get("/product", isAuthenticated, async (req, res, next) => {

    const {
        page,
        limit,
        descricao,
        categoria,
        brand,
        sku,
        avaible
    } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 100;

    let filter = {}

    const skip = (pageNumber - 1) * limitNumber;
    // if (descricao || categoria || brand || sku || avaible) filter.$or = []

    if (descricao) filter['descricao'] =  { $regex: new RegExp(descricao, "i") }
    if (categoria) filter['categoria'] = { $regex: new RegExp(categoria, "i")}
    if (brand) filter['marca'] = { $regex: new RegExp(brand, "i") } 
    if (sku) filter['codigo'] = { $regex: new RegExp(sku, "i") } 
    if (avaible) filter['avaible']= { $regex: new RegExp(avaible == "Indisponivel" ? false : true, "i") } 

    // if (descricao) filter.$or.push({ descricao: { $regex: new RegExp(descricao, "i") } })
    // if (categoria) filter.$or.push({ categoria: { $regex: new RegExp(categoria, "i") } })
    // if (brand) filter.$or.push({ marca: { $regex: new RegExp(brand, "i") } })
    // if (sku) filter.$or.push({ codigo: { $regex: new RegExp(sku, "i") } })
    // if (avaible) filter.$or.push({ avaible: { $regex: new RegExp(avaible == "Indisponivel" ? false : true, "i") } })

    try {
        
        const totalClientes = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalClientes / limitNumber);

        const result = await Product.find(filter).skip(skip).limit(limitNumber);

        res.json({
            result,
            currentPage: pageNumber,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os Clientes.' });
    }

});



module.exports = router;    