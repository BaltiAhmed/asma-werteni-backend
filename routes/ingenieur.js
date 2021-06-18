const express = require('express');
const route = express.Router();

const ingenieurControllers = require('../controllers/ingenieur')

const {check} = require('express-validator')

route.post('/signup', 
check('nom')
.not()
.isEmpty(),

check('prenom')
.not()
.isEmpty(),

check('email')
.normalizeEmail(),

check('password')
.isLength({min:8}),

check('telephone')
.isLength({min:8})
, ingenieurControllers.signup)

route.post('/login', 
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8})
, ingenieurControllers.login)

route.get('/',ingenieurControllers.getAllIngenieur)

route.get('/:id',
check('nom')
.not()
.isEmpty(),

check('prenom')
.not()
.isEmpty(),

check('email')
.normalizeEmail(),

check('password')
.isLength({min:8}),

check('telephone')
.isLength({min:8})
,ingenieurControllers.getIngenieurById)

route.patch('/:id',ingenieurControllers.updateIngenieur)

route.delete('/:id',ingenieurControllers.deleteIngenieur)






module.exports = route