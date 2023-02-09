import joi from 'joi'

export const customerSchema = joi.object({
	name: joi.string().min(1).required(),
	phone: joi.string().alphanum().pattern(/^[0-9]+$/).min(10).max(11).required(),
	cpf: joi.string().alphanum().pattern(/^[0-9]+$/).length(11).required(),
	birthday: joi.date().required()
})