import {db} from '../database.connection.js'
import dayjs from 'dayjs'

export async function listRentals(req,res){
	try {
		const rentals = await db.query(`SELECT * FROM rentals`)
		return res.status(200).send(rentals.rows)
	} catch {
		return res.sendStatus(500)
	}
}

export async function insertRental(req,res){
	try {
		const rentalData = req.body

		// //validations

		const customerExists = await db.query(`SELECT * FROM customers WHERE id = '${rentalData.customerId}'`)

		const gameExists = await db.query(`SELECT * FROM games WHERE id = '${rentalData.gameId}'`)

		if (Number(rentalData.daysRented) < 1 || customerExists.rows.length === 0 || gameExists.rows.length === 0) {
			return res.sendStatus(400)
		}

			// -> availability verification
			let totalStock = await db.query(`SELECT "stockTotal" from games WHERE id = '${rentalData.gameId}'`)
			totalStock = Number(totalStock.rows[0].stockTotal)

			let usedStock = await db.query(`SELECT * FROM rentals WHERE "gameId" = '${rentalData.gameId}'`)
			usedStock = Number(usedStock.rows.length)

			console.log(totalStock, usedStock)

			if (totalStock === usedStock) return res.status(400).send("Todos os jogos com esse ID já estão alugados!")
		// //end validations

		const rentDate = dayjs().get('year')+'-'+(1+dayjs().get('month'))+'-'+dayjs().get('date')

		console.log(rentDate)

		let pricePerDay = await db.query(`SELECT "pricePerDay" from "games" where id='${rentalData.gameId}'`)

		pricePerDay = Number(pricePerDay.rows[0].pricePerDay)

		const originalPrice = pricePerDay * Number(rentalData.daysRented)

		await db.query(`INSERT INTO rentals
		("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
		VALUES
		('${rentalData.customerId}',
		'${rentalData.gameId}',
		'${rentDate}',
		'${rentalData.daysRented}',
		null,
		'${originalPrice}',
		null)`)

		res.sendStatus(201)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

export async function returnRental(req,res){
	return res.sendStatus(200)
}

export async function deleteRental(req,res){
	return res.sendStatus(200)
}