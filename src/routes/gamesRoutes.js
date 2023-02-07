import express from "express";

import {listGames, insertGame} from '../controllers/gamesController.js'

import {validateGame} from '../middlewares/validateGame.js'

const gamesRoutes = express.Router()

gamesRoutes.get('/games', listGames)
gamesRoutes.post('/games', validateGame, insertGame)

export default gamesRoutes