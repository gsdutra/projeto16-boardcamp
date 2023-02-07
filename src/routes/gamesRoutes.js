import express from "express";

import {listGames, insertGame} from '../controllers/gamesController.js'

const gamesRoutes = express.Router()

gamesRoutes.get('/games', listGames)
gamesRoutes.post('/games', insertGame)

export default gamesRoutes