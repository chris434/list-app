import express from 'express'
import { createList, getLists } from '../controllers/listControllers.js'
import { authenticateUser } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/create-list', authenticateUser, createList)
router.get('/get-lists', authenticateUser, getLists)

export default router