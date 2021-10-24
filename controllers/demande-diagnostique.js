const httpError = require("../models/error");

const demande = require("../models/demande-diagnostique");
const agriculteur = require("../models/agriculteur");

const { validationResult } = require("express-validator");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { type, couleur, feuille, maladie, blee, sympthome, agriculteurID } =
    req.body;

  const createdDemande = new demande({
    type,
    image: req.file.path,
    couleur,
    feuille,
    maladie,
    blee,
    sympthome,
    finished: false,
    reponses: [],
  });

  let existingAgriculteur;
  try {
    existingAgriculteur = await agriculteur.findById(agriculteurID);
  } catch {
    const error = new httpError("failed to fetch try again later", 500);
    return next(error);
  }

  try {
    createdDemande.save();
    existingAgriculteur.demandeDiagnostique.push(createdDemande);
    existingAgriculteur.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ demande: createdDemande });
};

const getDemande = async (req, res, next) => {
  let existingDemande;
  try {
    existingDemande = await demande.find();
  } catch {
    const error = new httpError("failed to fetch try again later", 500);
    return next(error);
  }
  res.json({ demande: existingDemande });
};

const getDemandeById = async (req, res, next) => {
  const id = req.params.id;
  let existingDemande;
  try {
    existingDemande = await demande.findById(id);
  } catch {
    const error = new httpError("failed to fetch try again later", 500);
    return next(error);
  }
  res.json({ demande: existingDemande });
};

const getDemandeByAgriculteurId = async (req, res, next) => {
  const id = req.params.id;

  let existingDemande;
  try {
    existingDemande = await agriculteur.findById(id).populate("demandeDiagnostique");
  } catch (err) {
    const error = new httpError(
      "Fetching BolPlan failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingDemande || existingDemande.demandeDiagnostique.length === 0) {
    return next(
      new httpError("Could not find BonPlan for the provided user id.", 404)
    );
  }

  res.json({
    demandeDiagnostique: existingDemande.demandeDiagnostique.map((el) =>
      el.toObject({ getters: true })
    ),
  });
};

exports.ajout = ajout;
exports.getDemande = getDemande;
exports.getDemandeById = getDemandeById
exports.getDemandeByAgriculteurId = getDemandeByAgriculteurId
