import express from 'express'

import PlaceController from './controllers/PlaceController'
import UserController from './controllers/UserController'

import { verifyToken } from './utils/manageToken'

const placeController = new PlaceController()
const userController = new UserController()

const routes = express.Router()

routes.get('/places', verifyToken, placeController.index)

routes.post('/login', userController.login)
routes.post('/user', userController.store)

export default routes