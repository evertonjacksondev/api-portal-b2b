
require("dotenv").config();

require("./db");
const express = require("express");

const app = express();
require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const custormerRoutes = require("./routes/customer.routes");
app.use("/v1", custormerRoutes);

const order = Routes = require("./routes/order.routes");
app.use("/v1", order);

const product = Routes = require("./routes/product.routes");
app.use("/v1", product);


require("./error-handling")(app);

module.exports = app;
