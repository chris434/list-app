import express from 'express'
import { createList, getLists, getList, deleteList } from '../controllers/listControllers.js'
import { authenticateUser, authenticateList } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/', authenticateUser, createList)
router.get('/', authenticateUser, getLists)
router.get('/:id', authenticateList, getList)
router.delete('/:id', authenticateList, deleteList)

export default router