import express from 'express'
import { createList, getLists, getList } from '../controllers/listControllers.js'
import { authenticateUser, authenticateList } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/create-list', authenticateUser, createList)
router.get('/get-lists', authenticateUser, getLists)
router.get('/get-list/:id', authenticateList, getList)

export default router