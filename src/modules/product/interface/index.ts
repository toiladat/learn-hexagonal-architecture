import { IUsecase } from "@/share/interface";
import { ProductCondDTO, ProductCreateDTO, ProductUpdateDTO } from "../model/dto";
import { Product, ProductBrand, ProductCategory } from "../model/model";

export interface IProductUsecase extends IUsecase<ProductCreateDTO, ProductUpdateDTO, Product, ProductCondDTO>{
  
  // somethingMethod(): Promise<void>
}

//Khi query Product thi can them Cate & Brand
//Do do logic co the nam o 
// Transport ( dung cho BFF ( backend for FE)): phu thuoc vao fe can nhung gi de tra theo query cua fe
// Usecae ( hay dung hon)
// Repository ( dung trong clean, DDD)

//O day la query RPC | den DB
//Dat ten inteface phai doc lap voi cac class|inter implements den no
export interface IBrandQueryRepository {
  get(id: string): Promise<ProductBrand | null>
  listByIds(ids: string[]):Promise<Array<ProductBrand>>
}

export interface ICategoryQueryRepository {
  get(id: string): Promise<ProductCategory | null>
}