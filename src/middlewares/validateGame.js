import {gameSchema} from '../schema/gameSchema.js'

export async function validateGame(req, res, next){
	
	try{
		const gameData = req.body

		const validation = gameSchema.validate(gameData, { abortEarly: true })

		if (validation.error){
			return res.status(422).send(validation.error.details)
		}

		next()

	}catch{
		return res.sendStatus(500)
	}
}