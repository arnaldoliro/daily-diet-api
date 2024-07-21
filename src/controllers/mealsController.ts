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

    async selectMeal(req: Request, res: Response) {
        const {id, name, email} = req.body
        const user = await prisma.user.findFirst({where: {email: email}})

        if (!user) {
            return res.status(400).send({error: 'Usuário não encontrado'})
        }

        try {
            const meal = await prisma.meals.findUnique({where: {id: id, userId: user.id}})
            return res.status(200).send(meal)
        } catch(error) {
            return res.status(400).send({ error: 'Tarefa não encontrada' })
        }
    }

    async editMeals(req: Request, res: Response) {
        
        
        const {id, email, name, description, onDiet} = req.body
        const user = await prisma.user.findFirst({where: {email: email}})

        if (!user) {
            return res.status(400).send({error: 'Usuário não encontrado'})
        }

        try {
            const updateMeal = await prisma.meals.update({where: {userId: user.id, id: id},
            data: {
                name: name,
                description: description,
                onDiet: onDiet,
            }
        })
        return res.status(200).send(updateMeal)
        } catch(error) {
            return res.status(400).send({error: 'Não foi possivel atualizar a refeição'})
        }
    }
}