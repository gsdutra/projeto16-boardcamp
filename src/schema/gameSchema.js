import joi from 'joi'

export const gameSchema = joi.object({
	name: joi.string().min(1).required(),
	image: joi.string().required(),
	stockTotal: joi.number().greater(0).required(),
	pricePerDay: joi.number().greater(0).required()
})