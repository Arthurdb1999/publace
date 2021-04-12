import express from 'express'

import PlaceController from './controllers/PlaceController'
import UserController from './controllers/UserController'
import RelationController from './controllers/RelationController'

import { verifyToken } from './utils/manageToken'

const placeController = new PlaceController()
const userController = new UserController()
const relationController = new RelationController()

const routes = express.Router()

routes.get('/places', verifyToken, placeController.index)

routes.post('/login', userController.login)
routes.post('/user', userController.store)

routes.post('/relation', verifyToken, relationController.store)
routes.delete('/relation', verifyToken, relationController.delete)

export default routes