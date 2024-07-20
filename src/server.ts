import express from 'express'
import userRoutes from './routes/userRoutes'
import mealsRoutes from './routes/mealsRoutes'

const app = express()

app.use(express.json())

app.use('/user', userRoutes)
app.use('/meals', mealsRoutes)

app.listen(3000, () => {
    console.log('Server is running')
})  