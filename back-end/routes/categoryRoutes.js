import express from 'express'
import { getUsersCategories, createCategory, getListCategories } from '../controllers/categoryControllers.js'
import { authenticateUser, authenticateList } from '../Middleware/authenticate.js'

const router = express.Router()

router.get('/', authenticateUser, getUsersCategories)
router.get('/:listId', authenticateList, getListCategories)
router.post('/', authenticateUser, createCategory)


export default router