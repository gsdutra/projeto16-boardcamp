import express from "express";

import {listRentals, insertRental, returnRental, deleteRental} from '../controllers/rentalsController.js'

import {validateRental} from '../middlewares/validateRental.js'

const rentalsRoutes = express.Router()

rentalsRoutes.get('/rentals', listRentals)
rentalsRoutes.post('/rentals', validateRental, insertRental)
rentalsRoutes.post('/rentals/:id/return', returnRental)
rentalsRoutes.delete('/rentals/:id', deleteRental)

export default rentalsRoutes