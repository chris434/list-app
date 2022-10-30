import express from 'express'
import { createList } from '../controllers/listControllers.js'
import { authenticateUser } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/create-list', authenticateUser, createList)

export default router