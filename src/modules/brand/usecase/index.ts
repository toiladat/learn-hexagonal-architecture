import { ZodError } from "zod";
import { PagingDTO } from "../../../share/model/paging";
import { IBrandRepository, IBrandUsecase } from "../interface";
import { BrandCreateDTO, BrandUpdateDTO, BrandCondDTO } from "../model/dto";
import { BrandDTO, BrandSchema } from "../model/model";
import { ErrorBrandNameTooShort } from "../model/error";
import { v7 } from "uuid";

export class BrandUsecase implements IBrandUsecase{
  constructor(
    private readonly repository: IBrandRepository
  ){}
  
  async create(payload: BrandCreateDTO): Promise<string> {
    
    //validate
    const {success, error, data: parsedData} = BrandSchema.safeParse(payload)
    //TODO: process error
    if( error) {
      const nameError = (error as ZodError).issues.find((issue)=> issue.path[0] === 'name')
      if (nameError) {
        throw ErrorBrandNameTooShort
      }
      throw error
    }    

    const newId= v7()
    const category: BrandDTO= {
      ...parsedData,
      id: newId,
      otherBusinessFields: ''
    }
    const result =  this.repository.insert(category)
    return newId
 }
  get(id: string): Promise<BrandDTO | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: BrandUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  list(cond: BrandCondDTO, pag: PagingDTO): Promise<Array<BrandDTO>> {
    throw new Error("Method not implemented.");
  }

}