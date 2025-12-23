import { Request, Response } from "express";
import { IUsecase } from "../interface";

export abstract class BaseHttpService<Entity,CreateDTO, UpdateDTO,Cond> {
  constructor(
    readonly usecase: IUsecase<CreateDTO, UpdateDTO, Entity, Cond>
  ) {}

   async createAPI (req: Request<any, any, CreateDTO>, res: Response){
    try {
      const result = await this.usecase.create(req.body)
      res.status(201).json({ data: result})
    } catch (error) {
      res.status(400).json({
        message:(error as Error).message
      })
    }
   }

   async getDetalAPI(req:Request, res: Response) {
    try {
      const {id} = req.params
      const result = await this.usecase.getDetail(id as string)
      res.status(200).json({
        data: result
      })
    } catch (error) {
      res.status(400).json({
        messsage: (error as Error).message
      })
    }
   }

   async listAPI(req:Request, res: Response) {
   }
   async updateAPI(req:Request, res: Response) {
    
   }

   async deleteAPI(req:Request, res: Response) {
    
   }
}