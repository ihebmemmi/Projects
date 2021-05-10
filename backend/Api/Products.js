const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const products = require("../models/Products");
const route = express.Router();

//ajouter un produit
route.post("/", async (req, res) => {
  try {
    let Produit = new products();
    Produit.code = req.body.code;
    Produit.nom = req.body.nom;
    Produit.description = req.body.description;
    Produit.imageUrl = req.body.imageUrl;
    Produit.etat = req.body.etat;
    Produit.prix = req.body.prix;
    Produit.categorie = req.body.categorie;
    Produit.service = req.body.service;

    await Produit.save();

    res.json(Produit);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// lister tous
route.get("/", async (req, res) => {
  const Produits = await products.find();
  res.json(Produits);
});

//supprimer produit
route.delete("/delete/:id", async (req, res) => {
  const result = await products.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

// lister un produit par id
route.get("/:id", async (req, res) => {
  const Produits = await products.findById({ _id: req.params.id });
  res.json(Produits);
});

//route.patch("/update/:id", async (req, res) => {
//try {
//const id = req.params.id;
//const updates = req.body;
//const result = await produits.findByIdAndUpdate(id, updates);
//res.send(result);
//res.json(produits);
//} catch (err) {
// console.log(err);
//}
//});
route.patch("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const prod = await products.findByIdAndUpdate(_id, req.body);
    res.send(prod);
  } catch (err) {
    res.status(400).send(err);
  }
});

// route.put("/put/:id", async (req, res) => {
//   try {
//     let produit = await produits.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           code: req.body.code,
//           nom: req.body.nom,
//           description: req.body.description,
//           imageUrl: req.body.imageUrl,
//           etat: req.body.etat,
//           prix: req.body.prix,
//           categorie: req.body.categorieID,
//           service: req.body.serviceID,
//         },
//       },
//       { upsert: true }
//     );
//     res.json({
//       success: true,
//       updatedProduit: produit,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

module.exports = route;
