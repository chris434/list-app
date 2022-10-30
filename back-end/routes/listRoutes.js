import express from 'express'
import { createList } from '../controllers/listControllers.js'

const router = express.Router()

router.post('/create-list', createList)

export default router