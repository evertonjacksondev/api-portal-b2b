const Config = require("../models/Config.model.js");

const generateTempOrderId = async () => {


    let configReturn = await Config.findOneAndUpdate(
        {},
        { $inc: { numberOrder: 1 } },
        { new: true, upset: true }
    );

    return `PB${configReturn.numberOrder}`;
}

module.exports = generateTempOrderId