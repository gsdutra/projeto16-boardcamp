import {db} from '../database.connection.js'

export async function listCustomers(req, res){
	try{
		const users = await db.query(`SELECT * FROM customers`)
		res.status(200).send(users.rows)
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
		const id = req.params.id
		const user = req.body

		const cpfAlreadyExists = await db.query(`SELECT * FROM customers WHERE cpf = '${user.cpf}'`)

		console.log(cpfAlreadyExists.rows)

		if (cpfAlreadyExists.rows.length > 0 && cpfAlreadyExists.rows[0].id != id) return res.sendStatus(409)

		const userExists = await db.query(`SELECT * FROM customers WHERE id = '${id}'`)

		if(userExists.rows.length === 0) return res.sendStatus(404)

		const update = await db.query(`UPDATE customers SET name='${user.name}', phone='${user.phone}', cpf='${user.cpf}', birthday='${user.birthday}' WHERE id = '${id}'`)

		return res.sendStatus(200)
	}catch{
		res.sendStatus(500)
	}
}

export async function showSinlgeCustomer(req, res){
	try{
		const id = req.params.id
		const userExists = await db.query(`SELECT * FROM customers WHERE id = '${id}'`)

		if(userExists.rows.length === 0) return res.sendStatus(404)

		res.status(200).send(userExists.rows[0])
	}catch{
		res.sendStatus(500)
	}
}