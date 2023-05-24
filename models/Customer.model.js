const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        codigo: {
            type: String,
            required: [true, "codigo Obrigatório."],
        },
        status: {
            type: Number,
            required: [true, "status Obrigatório."],
        },
        nome: {
            type: String,
            required: [false, "nome Obrigatório."],
        },
        UltimaCompra: {
            type: String,
            required: [false, "UltimaCompra Obrigatório."],
        },
        logradouro: {
            type: String,
            required: [false, "logradouro Obrigatório."],
        },
        bairro: {
            type: String,
            required: [false, "bairro Obrigatório."],
        },
        cidade: {
            type: String,
            required: [false, "cidade Obrigatório."],
        },
        UF: {
            type: String,
            required: [false, "UF Obrigatório."],
        },
        CEP: {
            type: String,
            required: [false, "CEP Obrigatório."],
        },
        documento: {
            type: String,
            required: [false, "documento Obrigatório."],
        },
        email: {
            type: String,
            required: [false, "email Obrigatório."],
        },
        classificacao: {
            type: String,
            required: [false, "classificacao Obrigatório."],
        },
        codigoRepresentante: {
            type: String,
            required: [false, "codigoRepresentante Obrigatório."],
        },
        nomeRepresentante: {
            type: String,
            required: [false, "nomeRepresentante Obrigatório."],
        },
        documentoRepresentante: {
            type: String,
            required: [false, "documentoRepresentante Obrigatório."],
        },
        codigoVendedor: {
            type: String,
            required: [false, "codigoVendedor Obrigatório."],
        },
        nomeVendedor: {
            type: String,
            required: [false, "nomeVendedor Obrigatório."],
        },
        documentoVendedor: {
            type: String,
            required: [false, "documentoVendedor Obrigatório."],
        },
        number: {
            type: String,
            required: [false, "number Obrigatório."],
        },
        complemento: {
            type: String,
            required: [false, "complemento Obrigatório."],
        },
    },
    {
        timestamps: true,

    });

const Customer = model("Customer", userSchema);

module.exports = Customer;

