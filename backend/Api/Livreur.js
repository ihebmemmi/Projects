const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const User = require("../DB/User");
const livreurs = require("../models/Livreur");
//const user = require("../Api/User");
const route = express.Router();

// register livreur
route.post("/register", async (req, res) => {
  try{
      
  let sameEmail = await livreurs.find({ email:req.body.email });
  if (sameEmail.length >= 1) {
        return res.status(409).json({
          message: "email already in use",
        });
      }
      const {
        nom,
        prenom,
        genre,
        email,
        password,
        telephone,
        imageUrl,
        etat,
      } = req.body;
  await bcrypt.hash(password, 8).then((hashedPassword) => {
  const Livreurs = {};
  Livreurs.nom = nom;
  Livreurs.prenom = prenom;
  Livreurs.genre = genre;
  Livreurs.password= hashedPassword;
  Livreurs.email = email;
  Livreurs.telephone = telephone;
  Livreurs.imageUrl = imageUrl;
  Livreurs.etat = etat;

  let livreursModel = new livreurs(Livreurs);
  livreursModel.save();
  res.json(livreursModel);
  });
  }  
catch (err) {
  res.json(err, "err");
  }
});
//login livreur
route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await livreurs.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

route.get("/", async (req, res) => {
  const Livreurs = await livreurs.find();
  res.json(Livreurs);
});

route.get("/:id", async (req, res) => {
  const Livreurs = await livreurs.findById({ _id: req.params.id });
  res.json(Livreurs);
});

//supprimer livreur
route.delete("/delete/:id", async (req, res) => {
  const result = await livreurs.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});
module.exports = route;
