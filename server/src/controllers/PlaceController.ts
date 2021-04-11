
import { Request, Response } from 'express'
import db from '../database/connection'

export default class PlaceController {
    async index(req: Request, res: Response) {

        const { rows: places } = await db.query(`
            SELECT ST_X(geom) as longitude, ST_Y(geom) as latitude, * from place
            `)
            // INNER JOIN place_usuario ON place_usuario.place_id = place.id
            // INNER JOIN usuario ON usuario.id = place_usuario.usuario_id
            // INNER JOIN relation ON relation.id = place_usuario.relation_id

        const serializedPlaces = places.map(place => {
            return {
                ...place,
                image_url: `http://localhost:3333/uploads/${place.image}`
            }
        })

        return res.json(serializedPlaces)
    }
}