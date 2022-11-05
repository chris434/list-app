import express from 'express'
import { addListItem, editListItem, deleteListItem } from '../controllers/listItemController.js'
import { authenticateList } from '../Middleware/authenticate.js'

const router = express.Router()

router.post('/:id', authenticateList, addListItem)
router.patch('/:id', authenticateList, editListItem)
router.delete('/:id', authenticateList, deleteListItem)

export default router