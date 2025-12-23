import { Request, Response } from "express";
import { BrandCondSchema, BrandCreateDTO, BrandCreateSchema } from "../../model/dto";
import { CreateCommand, GetDetailQuery, IBrandUsecase, UpdateCommand } from "../../interface";
import { CreateBrandCmdHandler } from "../../usecase/create-brand";
import { BrandDTO } from "../../model/model";
import { ICommandHandler, IQueryHandler } from "../../../../share/interface";

export class BrandHttpService {
  constructor(
    private readonly usecase: IBrandUsecase,
    private readonly createCmdHandler: ICommandHandler<CreateCommand, string>,
    private readonly getDetailQueryHandler: IQueryHandler<GetDetailQuery, BrandDTO>,
    private readonly updateCmdHandler: ICommandHandler<UpdateCommand, void>
  ){}

  async createAPI( req: Request, res: Response){
   try {

    //Neu cmd den tu message broker thi rut ra dung nhu bth
    const cmd: CreateCommand= {cmd: req.body}
    const result = await this.createCmdHandler.execute(cmd)
    res.status(200).json({
      id: result
    })
   } catch (error) {
    throw error
   }
  }

  async getDetailAPI( req: Request, res: Response) {
    try {
        const {id} = req.params
    if( !id){
      res.status(400).json("id thieu")
      return
    }
    const result = await this.getDetailQueryHandler.query({id})
    res.status(200).json({
      data: result
    })
    } catch (error) {
      throw error
    }

  }

  async listAPI( req: Request, res: Response) {
    //Cate thi khong can phan trang
    const pag = {
      page:1,
      limit: 300
    }

    const cond = BrandCondSchema.parse(req.query)
    const result = await this.usecase.list(cond, pag)
  }

  async updateAPI( req: Request, res: Response){
    const {id}= req.params
    if(!id)
      throw new Error("id thieu")
    const cmd: UpdateCommand ={
      id,
      payload: req.body
    }
   await this.updateCmdHandler.execute(cmd)
   res.status(200).json({data: true   })
  }

  async listByIds (req: Request, res: Response){
    //call directly to repository cause it is same level
  }
}