import express from "express";

import {signIn, signUp, editCustomer} from '../controllers/customersController.js'

const customersRoutes = express.Router()

customersRoutes.get('/customer', signIn)
customersRoutes.post('/customer', signUp)
customersRoutes.put('/customer', editCustomer)

export default customersRoutes