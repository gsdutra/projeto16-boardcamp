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