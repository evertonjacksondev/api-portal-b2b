const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        
        codigo: {
            type: String,
            required: [false, "codigo is required."],
        },
        descricao: {
            type: String,
            required: [false, "descricao is required."],
        },
        categoria: {
            type: String,
            required: [false, "categoria is required."],
        },
        subCategoria: {
            type: String,
            required: [false, "subCategoria is required."],
        },
        marca: {
            type: String,
            required: [false, "marca is required."],
        },
        imagem: {
            type: String,
            required: [false, "imagem is required."],
        },
        CodigoProdutoFornecedor:  {
            type: String,
            required: [false, "CodigoProdutoFornecedor is required."],
        },
        fromPrice: {
            type: Number,
            required: [false, "fromPrice is required."],
        },
        price:  {
            type: Number,
            required: [false, "price is required."],
        },
        stock:  {
            type: Number,
            required: [false, "stock is required."],
        },
        avaible: {
            type: String,
            required: [false, "avaible is required."],
        },

    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Product = model("Product", userSchema);


module.exports = Product;

