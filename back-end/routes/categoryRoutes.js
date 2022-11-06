import express from 'express'
import { getUsersCategories } from '../controllers/categoryControllers.js'
import { authenticateUser, authenticateList } from '../Middleware/authenticate.js'

const router = express.Router()

router.ge('/', authenticateUser, getUsersCategories)


export default router