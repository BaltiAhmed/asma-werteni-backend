const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reponceSchema = new schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  cause: { type: String, required: true },
  traitement: [
    { type: mongoose.Types.ObjectId, required: true, ref: "traitement" },
  ],
});

module.exports = mongoose.model("reponse", reponceSchema);
