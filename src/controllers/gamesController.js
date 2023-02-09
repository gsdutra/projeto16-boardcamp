import {db} from '../database.connection.js'

export async function listGames(req,res){
	try {
		const games = await db.query(`SELECT * FROM games`)
		res.status(200).send(games.rows)
	} catch {
		res.sendStatus(500)
	}
}

export async function insertGame(req,res){
	// try {
		const gameData = req.body

		const nameAlreadyExists = await db.query(`SELECT * FROM games WHERE name = '${gameData.name}'`)

		if (nameAlreadyExists.rows.length > 0) return res.sendStatus(409)

		await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${gameData.name}','${gameData.image}','${gameData.stockTotal}','${gameData.pricePerDay}')`)

		res.sendStatus(201)
	// } catch {
	// 	res.sendStatus(500)
	// }
	
}
