import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import db from "../database/connection"
import { getToken } from "../utils/manageToken"
import { JwtInfo } from "./UserController"

export default class RelationController {
    async store(req: Request, res: Response) {
        const { relation_id, place_id } = req.body

        const { id } = jwt.decode(getToken(req)) as JwtInfo

        try {
            const response = await db.query(`INSERT INTO place_usuario VALUES(default, ${id}, ${place_id}, ${relation_id})`)
            return res.json(response)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Erro desconhecido' })
        }
    }

    async delete(req: Request, res: Response) {
        const { place_usuario_id } = req.query

        await db.query(`delete from place_usuario where id = ${place_usuario_id}`)

        return res.status(201)
    }
}