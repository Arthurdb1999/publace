
import { Request, Response } from 'express'
import db from '../database/connection'

export default class PlaceController {
    async index(req: Request, res: Response) {

        const { latitude, longitude } = req.query
        console.log(latitude, longitude);
        
        const { rows: places } = await db.query(`
            SELECT ST_X(geom) as longitude, ST_Y(geom) as latitude, *,
            ST_Distance(ST_SetSRID(geom, 4618), ST_SetSRID(ST_MakePoint(${latitude}, ${longitude}), 4618)) * 100 as km from place,
            ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint(${latitude}, ${longitude}),4618), 26986), 3000,'quad_segs=360')
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