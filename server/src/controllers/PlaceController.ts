
import { Request, Response } from 'express'
import db from '../database/connection'

export default class PlaceController {
    async index(req: Request, res: Response) {

        const { latitude, longitude } = req.query

        // ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint(${latitude}, ${longitude}),4618), 26986), 3000,'quad_segs=360')
        
        const { rows: places } = await db.query(`
            SELECT ST_X(geom) as longitude,
                ST_Y(geom) as latitude, 
                place.*,
                json_agg(place_usuario) as relations,
                ST_Distance(ST_SetSRID(geom, 4618), ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4618)) * 100 as distance
            from place
            left JOIN place_usuario ON place_usuario.place_id = place.id
            left JOIN usuario ON usuario.id = place_usuario.usuario_id
            left JOIN relation ON relation.id = place_usuario.relation_id
            group by place.id, place_usuario.id, usuario.id, relation.id
            `)

        const { rows: placesInRadius } = await db.query(`
            SELECT COUNT(ST_Distance(ST_SetSRID(geom, 4618), ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4618)) * 100)
            FROM place where ST_Distance(ST_SetSRID(geom, 4618), ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4618)) * 100 <= 1
            GROUP BY place.id`)



        const serializedPlaces = places.map(place => {
            return {
                ...place,
                image_url: `http://localhost:3333/uploads/${place.image}`
            }
        })

        return res.json({serializedPlaces, count: placesInRadius.length})
    }
}