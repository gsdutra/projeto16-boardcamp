import {rentalSchema} from '../schema/rentalSchema.js'

export async function validateRental(req, res, next){
	try{
		const rentalData = req.body

		const validation = rentalSchema.validate(rentalData, { abortEarly: true })

		if (validation.error){
			return res.status(422).send(validation.error.details)
		}

		next()

	}catch{
		return res.sendStatus(500)
	}
}