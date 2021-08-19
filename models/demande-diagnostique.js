const mongoose = require("mongoose");
const schema = mongoose.Schema;

const demandeDiagnostiqueSchema = new schema({
  type: { type: String, required: true },
  image: { type: String, required: true },
  couleur: { type: String, required: true },
  feuille: { type: String },
  maladie: { type: String },
  blee: { type: String },
  sympthome: { type: String },
  reponses: [{ type: mongoose.Types.ObjectId, required: true, ref: "reponse" }],
});

module.exports = mongoose.model(
  "demandeDiagnostique",
  demandeDiagnostiqueSchema
);
