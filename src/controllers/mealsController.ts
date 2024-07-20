import { Request, Response } from "express";
import prisma from "../database/database";

export default class MealsController {
    async listMeals(req:Request, res:Response) {
        const { email } = req.body

        const user = await prisma.user.findFirst({where: {email: email}})

        if(!user) {
            return res.status(400).send('Usuário não encontrado')
        }

        try {
            const list = await prisma.meals.findMany({where: {userId: user.id}})
            return res.status(200).send(list)
        } catch(error) {
            return res.status(400).send({error: 'Falha ao listar as refeições'})
        }
    }

    async createMeals(req: Request, res: Response) {
        const { name, description, onDiet, email } = req.body
        const user = await prisma.user.findFirst({where: {email: email}})

        if (!user) {
            return res.status(400).send({error: 'Usuário não encontrado'})
        }
        try {
            const newMeal = await prisma.meals.create({
                data: {
                    name: name,
                    description: description,
                    onDiet: onDiet,
                    userId: user.id
                }
            })
            return res.status(200).send(newMeal)
        } catch(error) {
            return res.status(500).send({error: 'Não foi possivel criar a refeição'})
        }
    }

    async deleteMeals(req: Request, res: Response) {
        const {id, name, email} = req.body
        const user = await prisma.user.findFirst({where: {email: email}})

        if (!user) {
            return res.status(400).send({error: 'Usuário não encontrado'})
        }

        try {
            const mealDeleted = await prisma.meals.delete({where: {id: id}})
            return res.status(200).send(mealDeleted)
        } catch(error) {return res.status(400).send({error: 'Falha ao remover a refeição'})}
    }
}