import express from "express";

import {listRentals, insertRental, returnRental, deleteRental} from '../controllers/rentalsController.js'

const rentalsRoutes = express.Router()

rentalsRoutes.get('/rentals', listRentals)
rentalsRoutes.post('/rentals', insertRental)
rentalsRoutes.post('/rentals/:id/return', returnRental)
rentalsRoutes.delete('/rentals', deleteRental)

export default rentalsRoutes