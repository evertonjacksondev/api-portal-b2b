
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const express = require("express");
const router = express.Router();
const generateTempOrderId = require("../lib/communs.js");
const Order = require("../models/Order.model.js");


router.post("/order", isAuthenticated, async (req, res, next) => {

    let orders = req.body;
    for (let order of orders) {
        try {
            const number = await generateTempOrderId()
            await Order.updateMany({ orderId: number }, { $set: { ...order, status: 'pending' } }, { upsert: true })

        } catch (error) {
            res.status(4001).json('Não foi possivel salvar o orçamento')
        }
    }
    res.status(200).json('Orçamento Salvo com sucesso !')
});

router.get("/order", isAuthenticated, async (req, res, next) => {

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

    // if (descricao) filter['descricao'] =  { $regex: new RegExp(descricao, "i") }
    // if (categoria) filter['categoria'] = { $regex: new RegExp(categoria, "i")}
    // if (brand) filter['marca'] = { $regex: new RegExp(brand, "i") } 
    // if (sku) filter['codigo'] = { $regex: new RegExp(sku, "i") } 
    // if (avaible) filter['avaible']= { $regex: new RegExp(avaible == "Indisponivel" ? false : true, "i") } 
    try {
        
        const totalOrders = await Order.countDocuments(filter);
        const totalPages = Math.ceil(totalOrders / limitNumber);

        const result = await Order.find(filter).skip(skip).limit(limitNumber);

        res.json({
            result,
            currentPage: pageNumber,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os Pedidos.' });
    }

});


module.exports = router;    