import { IController } from './../IController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from "express";

export class CreateUserController implements IController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password
      })

      return res.status(201).send();
    } catch(err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}