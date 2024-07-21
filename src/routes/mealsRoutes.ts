import { Router } from 'express'
import MealsController from '../controllers/mealsController'

const router = Router()
const mealsController = new MealsController()

router.get('/list', mealsController.listMeals)
router.post('/create', mealsController.createMeals)
router.delete('/delete', mealsController.deleteMeals)
router.get('/list/:id', mealsController.selectMeal)
router.post('/edit', mealsController.editMeals)
export default router