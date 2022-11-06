import express from 'express'
import { updateProfile } from '../controllers/userControllers.js'
import { authenticateUser } from '../Middleware/authenticate.js'

const router = express.Router()

router.patch('/:id', authenticateUser, updateProfile)

export default router