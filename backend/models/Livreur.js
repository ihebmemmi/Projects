const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const livreurs = new Schema({
  adresse: {
    type: Schema.Types.ObjectId,
    ref: "Adresse",
  },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  genre: { type: String, required: true },
  date_naissance: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  imageUrl: { type: String, required: true },
  etat: { type: String, required: true },
});

module.exports = mongoose.model("livreurs", livreurs);
