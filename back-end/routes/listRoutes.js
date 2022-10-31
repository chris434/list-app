import express from 'express'
import { createList, getLists, getList, addListItem, editListItem } from '../controllers/listControllers.js'
import { authenticateUser, authenticateList } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/create-list', authenticateUser, createList)
router.get('/get-lists', authenticateUser, getLists)
router.get('/get-list/:id', authenticateList, getList)
router.post('/add-list-item/:id', authenticateList, addListItem)
router.post('/edit-list-item/:id', authenticateList, editListItem)

export default router