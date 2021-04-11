
import { Request, Response } from 'express'
import db from '../database/connection'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

export default class UserController {
    async login(req: Request, res: Response) {

        const { email, password } = req.body

        try {
            const { rows: [user] } = await db.query<User>(`SELECT * from usuario WHERE email = '${email}'`)

            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    return res.json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        },
                        token: jwt.sign({
                            email: user.email,
                            nome: user.name
                        }, process.env.APP_SECRET as string)
                    })
                } else {
                    return res.status(400).json({ message: 'Senha incorreta!' })
                }
            } else {
                return res.status(400).json({ message: 'Email incorreto!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error, message: 'Erro desconhecido!' })
        }
    }

    async store(req: Request, res: Response) {
        const { email, name, password } = req.body

        try {
            await bcrypt.hash(password, 8, async (_err, hash) => {
                await db.query(`INSERT INTO usuario VALUES (default, '${name}', '${email}', '${hash}')`)

                return res.json({ message: 'Usuário cadastrado!' })
            })
        } catch (error) {
            db.end()
            console.log(error)
            return res.status(500).json({ message: 'Erro desconhecido!' })
        }

    }
}