import { CategoryDTO, CategorySchema } from './../model/model';
import { PagingDTO } from "../../../share/model/paging";
import { CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO } from "../model/dto";

//Interface for Usecase
export interface ICategoryUsecase{
  create(data: CategoryCreateDTO): Promise<string>
  get(id: string): Promise<CategoryDTO | null>
  update(id: string, data: CategoryUpdateDTO): Promise<boolean>
  delete(id: string): Promise<boolean>
  list(cond: CategoryCondDTO, pag: PagingDTO): Promise<Array<CategoryDTO>>
}




// Interface for Repository
export interface IRepository extends IQueryRepository,ICommandRepository {}
export interface IQueryRepository{
  get(id: string):Promise<CategoryDTO | null>
  list(condition: CategoryCondDTO, paging: PagingDTO):Promise<Array<CategoryDTO>>
}


export interface ICommandRepository{
  insert(data: any):Promise<boolean>;
  update(id: string, data: CategoryUpdateDTO): Promise<boolean>
  delete(id: string, isHard: boolean): Promise<boolean>

}