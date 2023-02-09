import {db} from '../database.connection.js'

export async function listCustomers(req, res){
	try{
		res.sendStatus(200)
	}catch{
		res.sendStatus(500)
	}
}

export async function insertCustomer(req, res){
	try{
		const user = req.body

		const cpfAlreadyExists = await db.query(`SELECT * FROM customers WHERE cpf = '${user.cpf}'`)

		if (cpfAlreadyExists.rows.length > 0) return res.sendStatus(409)

		await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${user.name}', '${user.phone}', '${user.cpf}', '${user.birthday}')`)
		return res.sendStatus(201)
	}catch{
		res.sendStatus(500)
	}
}

export async function editCustomer(req, res){
	try{
		res.sendStatus(200)
	}catch{
		res.sendStatus(500)
	}
}

export async function showSinlgeCustomer(req, res){
	try{
		res.status(200).send(req.params)
	}catch{
		res.sendStatus(500)
	}
}