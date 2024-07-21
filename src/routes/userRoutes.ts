import { Router } from 'express'
import UserController from '../controllers/userController'

const userController = new UserController()
const router = Router()

router.post('/create', userController.createUser)
router.get('/:id', userController.getUser)
router.delete('/delete', userController.deleteUser)
router.get('/metrics', userController.getAllMetricMeals)

export default router;