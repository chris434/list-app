import express from 'express'
import { createList, getLists, getList } from '../controllers/listControllers.js'
import { authenticateUser } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/create-list', authenticateUser, createList)
router.get('/get-lists', authenticateUser, getLists)
router.get('/get-list/:id', getList)

export default router