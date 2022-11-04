import express from 'express'
import { createList, getLists, getList, addListItem, editListItem, deleteListItem } from '../controllers/listControllers.js'
import { authenticateUser, authenticateList } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/create-list', authenticateUser, createList)
router.get('/get-lists', authenticateUser, getLists)
router.get('/get-list/:id', authenticateList, getList)
router.post('/add-list-item/:id', authenticateList, addListItem)
router.post('/edit-list-item/:id', authenticateList, editListItem)
router.delete('/delete-list-item/:id', authenticateList, deleteListItem)

export default router