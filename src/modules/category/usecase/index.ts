import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { ICategoryUsecase, IRepository } from "../interface";
import { CategoryCondDTO, CategoryCreateDTO, CategoryCreateSchema, CategoryUpdateDTO } from "../model/dto";
import { CategoryDTO } from "../model/model";
import { PagingDTO } from "../../../share/model/paging";
import { ErrorDataNotFound } from "../../../share/model/base-error";
import { ZodError } from "zod";
import { ErrorCategoryNameTooShort } from "../model/error";


//Trong thuc te se validate o usecase
export class CategoryUsecase implements ICategoryUsecase {
  constructor(
    private readonly repository: IRepository
  ){}
  async get(id: string): Promise<CategoryDTO | null> {
    const data=  await this.repository.get(id)
    if (!data || data.status === ModelStatus.INACTIVE){
      throw ErrorDataNotFound
      return null
    }
    return data
  }
  update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async list(cond: CategoryCondDTO, pag: PagingDTO): Promise<Array<CategoryDTO>> {
    //Logic service
    return await this.repository.list(cond, pag)
  }

  async create( payload: CategoryCreateDTO): Promise<string> {
    //validate
    const {success, error, data: parsedData} = CategoryCreateSchema.safeParse(payload)
    //TODO: process error
    if( error) {
      const nameError = (error as ZodError).issues.find((issue)=> issue.path[0] === 'name')
      if (nameError) {
        throw ErrorCategoryNameTooShort
      }
      throw error
    }    

    const newId= v7()
    const category: CategoryDTO= {
      ...parsedData,
      id: newId,
      status: ModelStatus.ACTIVE,
      otherBusinessFields: ''
    }
    const result =  this.repository.insert(category)
    return newId

  }
}