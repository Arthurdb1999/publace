import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (jwt.verify(`${getToken(req)}`, process.env.APP_SECRET, { complete: true })) {
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Sessão Expirada! Deslogando...', err: error })
    }
}

export function getToken(req: Request): string {
    return req.headers.authorization?.split(' ')[1]
}