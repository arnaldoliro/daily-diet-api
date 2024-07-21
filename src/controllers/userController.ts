import {Request, Response} from 'express'
import prisma from '../database/database'
import meals from '../interfaces.ts/meals'

export default class UserController {
    async getUser(req: Request, res: Response) {
        const { email, name } = req.body

        try {
            const user = await prisma.user.findUnique({where: {email: email}})
            return res.status(200).send(user)
        } catch (error) {
            return res.status(500).send({error: "Usuário não encontrado"})
        }
    }
    
    async createUser(req: Request, res: Response) {
        const { email, name } = req.body
        try {
            const newUser = await prisma.user.create({data: { email, name }})
            return res.status(200).send(newUser)
        } catch(error) {
            return res.status(500).send({error: 'Não foi possivel criar o usuário'})
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { email } = req.body

        try{
            const userRemoved = await prisma.user.delete({where: {email: email}})
            return res.status(200).send(userRemoved)
        } catch (error) {
            return res.status(500).send({error: "Não foi possivel deletar o usuário"})
        }
    }

    async getAllMetricMeals(req: Request, res: Response) {
        const { email } = req.body

        const user = await prisma.user.findFirst({where: {email: email}})

        if(!user) {
            return res.status(400).send('Usuário não encontrado')
        }

        let countOnDiet = 0
        let countOffDiet = 0
        let countSequences = 0
        let Sequence: number[] = []

        try {
            const meals: meals[] = await prisma.meals.findMany({
                where: {userId: user.id},
            })
            
            const teste = await prisma.meals.findFirst({
                orderBy: {
                    id: 'desc'
                }
            })

            meals.forEach(element => {

                if(element.onDiet === true){
                    countOnDiet++
                    countSequences++
                }
                else {
                    countOffDiet++
                    Sequence.push(countSequences)
                    countSequences = 0
                }

                if(element.onDiet === true && element.id === teste?.id) {
                    Sequence.push(countSequences)
                }
            })

            const maxSequence = Math.max(...Sequence)
            
            return res.status(200).send({
                numberOfMeals: meals.length,
                MealsOnDiet: countOnDiet,
                MealsOffDiet: countOffDiet,
                BestSequenceOfMealsOnDiet: maxSequence

            })
        } catch(error) {
            console.error(error)
            return res.status(400).send({error: 'Não foi possivel listar as refeições'})
        }
    }
}