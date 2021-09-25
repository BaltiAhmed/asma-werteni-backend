const express = require("express");
const route = express.Router();

const demandeControllers = require("../controllers/demande-diagnostique");
const fileUpload = require("../middleware/file-uploades");

const { check } = require("express-validator");

route.post("/ajout",fileUpload.single("image"), demandeControllers.ajout);
route.get('/',demandeControllers.getDemande)
route.get('/:id',demandeControllers.getDemandeById)

module.exports = route;
