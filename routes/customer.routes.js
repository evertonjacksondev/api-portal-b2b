
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer.model");
const User = require("../models/User.model.js");


router.post("/customer", isAuthenticated, async (req, res, next) => {

    const costumers = req.body;
    for (let costumer of costumers) {
        try {
            await Customer.collection.insertOne(costumer)
        } catch (error) {
            console.log(error)
        }
    }

    res.status(200).json('')
});


router.get("/customer", isAuthenticated, async (req, res, next) => {

    const {
        page,
        limit,
        codigo,
    } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    let cliente = req.payload;

    let filter = {}
    const skip = (pageNumber - 1) * limitNumber;
    const user = await User.findOne({ _id: cliente._id })
    if (codigo) filter['codigo'] = user.codigo
    if (user.type == 'Representante') filter['codigoRepresentante'] = user.codigo
    if (user.type == 'Vendedor') filter['codigoVendedor'] = user.codigo


    try {
        const totalClientes = await Customer.countDocuments(filter);
        const totalPages = Math.ceil(totalClientes / limitNumber);

        const result = await Customer.find(filter).skip(skip).limit(limitNumber);

        res.json({
            result,
            currentPage: pageNumber,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os Clientes.' });
    }

});


router.get("/customerid", isAuthenticated, async (req, res, next) => {
    try {
        const {
            search
        } = req.query;

        let filter = {}
        let cliente = req.payload;
        const user = await User.findOne({ _id: cliente._id })
        if (user.type == 'Representante') filter['codigoRepresentante'] = cliente.codigo
        if (user.type == 'Vendedor') filter['codigoVendedor'] = cliente.codigo

        if (search) filter = {
            ...filter,
            $or: [{ codigo: { $regex: new RegExp(search, "i") } }, { filter: { $regex: new RegExp(search, "i") } }, { nome: { $regex: new RegExp(search, "i") } }]
        }
        const result = await Customer.find(filter)
        res.json({
            result,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os Clientes.' });
    }

});


module.exports = router;    