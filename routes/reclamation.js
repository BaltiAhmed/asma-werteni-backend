const express = require("express");
const route = express.Router();

const reclamationControllers = require("../controllers/reclamation");

const { check } = require("express-validator");

route.post(
  "/ajoutreclamation",
  check("date").not().isEmpty(),
  check("sujet").not().isEmpty(),
  check("repondre").not().isEmpty(),
  reclamationControllers.ajoutreclamation
);




route.delete('/:id',reclamationControllers.deletereclamation)
route.get('/:id', reclamationControllers.getreclamationById)
route.get('/:', reclamationControllers.getreclamation)

module.exports = route;
