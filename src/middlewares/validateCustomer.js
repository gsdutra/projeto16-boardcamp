import {customerSchema} from '../schema/customerSchema.js'

export async function validateCustomer(req, res, next){

	try{
		const userCredentials = req.body;

		const validation = customerSchema.validate(userCredentials, { abortEarly: true })

		if (validation.error){
			return res.status(422).send(validation.error.details)
		}

		next()
	}catch(error){
		res.sendStatus(500)
	}
}