const express = require("express");
const mongoose = require("mongoose");
//const User = require("../DB/User");
const livreurs = require("../models/Livreur");
//const user = require("../Api/User");
const route = express.Router();

route.post("/", async (req, res) => {
  const {
    nom,
    prenom,
    genre,
    date_naissance,
    email,
    telephone,
    imageUrl,
    etat,
  } = req.body;
  let Livreurs = {};
  Livreurs.nom = nom;
  Livreurs.prenom = prenom;
  Livreurs.genre = genre;
  Livreurs.date_naissance = date_naissance;
  Livreurs.email = email;
  Livreurs.telephone = telephone;
  Livreurs.imageUrl = imageUrl;
  Livreurs.etat = etat;

  let livreursModel = new livreurs(Livreurs);
  await livreursModel.save();
  res.json(livreursModel);
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
