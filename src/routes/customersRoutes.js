import express from "express";

import {listCustomers, insertCustomer, editCustomer, showSinlgeCustomer} from '../controllers/customersController.js'

const customersRoutes = express.Router()

customersRoutes.get('/customers', listCustomers)
customersRoutes.get('/customers/:id', showSinlgeCustomer)
customersRoutes.post('/customers', insertCustomer)
customersRoutes.put('/customers', editCustomer)

export default customersRoutes