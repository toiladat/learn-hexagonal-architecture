import { Request, Response } from "express";
import { CategoryCondSchema, CategoryCreateSchema } from "../../model/dto";
import { ICategoryUsecase } from "../../interface";

export class CategoryHttpService {
  constructor(
    private readonly usecase: ICategoryUsecase
  ){}

  async createAPI( req: Request, res: Response){
   try {
     const { success, data, error} = CategoryCreateSchema.safeParse(req.body)
    if(! success){
      res.status(400).json({
        message: error.message
      })
      return
    }
    const result = await this.usecase.create(data)
    res.status(200).json({
      id: result
    })
   } catch (error) {
    throw error
   }
  }

  async getDetailAPI( req: Request, res: Response) {
    const {id} = req.params
    if( !id){
      res.status(400).json("id thieu")
      return
    }
    const result = await this.usecase.get(id)
    res.status(200).json({
      data: result
    })

  }

  async listAPI( req: Request, res: Response) {
    //Cate thi khong can phan trang
    const pag = {
      page:1,
      limit: 300
    }

    const cond = CategoryCondSchema.parse(req.query)
    const result = await this.usecase.list(cond, pag)
  }

}