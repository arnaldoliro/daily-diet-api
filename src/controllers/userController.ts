import {Request, Response} from 'express'
import prisma from '../database/database'
import { error } from 'console'

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
}