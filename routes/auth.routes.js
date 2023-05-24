const express = require("express");
const router = express.Router();
const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

router.post("/signup", async (req, res, next) => {
  const { email, password, name, type, codigo } = req.body;
  const secret = speakeasy.generateSecret({ length: 20 }).base32;
  if (email === "" || password === "" || name === "", type === "", codigo === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  await User.findOne({ email })
    .then(async (foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Usuário já existe." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);


      return await User.create({ email, password: hashedPassword, name, type, secret, codigo });
    })
    .then((createdUser) => {

      const { email, name, _id } = createdUser;


      const user = { email, name, _id };


      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

router.post("/login", async (req, res, next) => {
  const { email, password, geolocation } = req.body;


  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }


  User.findOne({ email })
    .then(async (foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "Usuário não existe." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name, codigo, isActive, secret } = foundUser;

        const payload = { _id, email, name, codigo, isActive, secret };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        if (geolocation) {
          await User.updateOne({ email }, { $push: { geolocation } }, { upsert: true })
        }

        res.status(200).json({ name, authToken: authToken, secret });
      } else {
        res.status(401).json({ message: "Senha incorreta" });
      }
    })
    .catch((err) => next(err));
});

router.post("/verify", isAuthenticated, async (req, res, next) => {

  try {

    const secret = req.payload.secret
    // O código OTP digitado pelo usuário
    const code = req.body.code;

    // Validar o código OTP
    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: code
    });

    if (isValid) {
      console.log('Código OTP válido');
      await User.updateOne({ _id: req.payload._id }, { $set: { isActive: true } }, { upsert: true })
      res.status(200).json({ ...req.payload, codeVerify: Boolean(isValid) });
    } else {
      throw 'Código OTP válido'
    }
  } catch (error) {
    res.status(401).json({ message: "Código de Autenticação inválido" });
  }

});

module.exports = router;
