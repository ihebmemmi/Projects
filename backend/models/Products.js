const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const products = new Schema({
  categorie: {
    type: String,
  },
  service: {
    type: String,
  },

  code: { type: String },
  nom: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  etat: { type: String },
  prix: { type: String },
});

module.exports = mongoose.model("Product", products);
