const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        numberOrder: {
            type: Number,
            required: [true, "numberOrder Obrigatório."],
        }
    },
    {
        timestamps: true,

    });

const Config = model("Config", userSchema);

module.exports = Config;

