
import { Request, Response } from 'express'
import db from '../database/connection'

export default class PlaceController {
    async index(req: Request, res: Response) {

        db.connect()

        const { rows: places } = await db.query('SELECT ST_X(ST_Centroid(location)), ST_Y(ST_Centroid(location)), * from places')

        const serializedPlaces = places.map(place => {
            return {
                ...place,
                image_url: `http://localhost:3333/uploads/${place.image}`
            }
        })

        db.end()

        return res.json(serializedPlaces)
    }
}