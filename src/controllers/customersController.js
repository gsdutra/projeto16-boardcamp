import {db} from '../database.connection.js'

export async function listCustomers(req, res){
	const customers = await db.query("SELECT * FROM customers");
    return res.send(customers.rows);
	// return res.sendStatus(200)
}

export async function insertCustomer(req, res){
	return res.sendStatus(200)
}

export async function editCustomer(req, res){
	return res.sendStatus(200)
}

export async function showSinlgeCustomer(req, res){
	return res.status(200).send(req.params)
}