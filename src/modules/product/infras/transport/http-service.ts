import { IUsecase } from "@/share/interface";
import { ProductCondDTO, ProductCreateDTO, ProductUpdateDTO } from "../../model/dto";
import { Product } from "../../model/model";
import { BaseHttpService } from "@/share/transport/http-service";
import { IBrandQueryRepository, ICategoryQueryRepository, IProductUsecase } from "../../interface";
import { IBrandRepository } from "@/modules/brand/interface";
import { Request, Response } from "express";
export class ProductHTTPService extends BaseHttpService<Product, ProductCreateDTO, ProductUpdateDTO, ProductCondDTO>{

  constructor(
    IUseCase : IProductUsecase,
    private readonly productBrandRepository: IBrandQueryRepository,
    private readonly productCategoryRepository: ICategoryQueryRepository

  ){
    super(IUseCase)
  }

  //override
  async getDetalAPI (req: Request, res: Response){
    try {
      const {id}= req.params
      const result = await this.usecase.getDetail(id as string)
      const brand = await this.productBrandRepository.get(result?.brandId as string)
      if( brand)
        result!.brand = brand

      const category = await this.productCategoryRepository.get(result?.categoryId as string)
      if( category)
        result!.category = category
      res.status(200).json({
        data: result
      })
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      })
    }
  }

}