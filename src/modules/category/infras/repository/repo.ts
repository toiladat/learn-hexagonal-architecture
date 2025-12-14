import { modelName } from './dto';
import { PagingDTO } from "../../../../share/model/paging";
import { IRepository } from "../../interface";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { CategoryDTO, CategorySchema } from "../../model/model";
import { ModelStatus } from '../../../../share/model/base-model';
import { where } from 'sequelize';

export class MYSQLCategoryRepository implements IRepository{
  constructor(
    private readonly sequelize: any,
    private readonly modelName: string
  ){
    
  }
  async get(id: string): Promise<CategoryDTO | null> {
    const data =await this.sequelize.models[this.modelName].findByPk(id)
    if(!data) {
        return null
    }

    //DB la created_at & updated_at
    //Model la createdAt & updatedAt
    //viet ham xu ly thi hon
    const persistenceData = (data.get({
      plain:true
    }))
    return {
      ...persistenceData,
      children:[],
      createdAt: persistenceData.created_at,
      updatedAt: persistenceData.created_at,
    } as CategoryDTO
  }

  async delete (id: string, isHard:boolean = false): Promise<boolean>{
    if (isHard) {
       await this.sequelize.models[this.modelName].destroy({
        id
      })
    }
     await this.sequelize.models[this.modelName].update({
      status: ModelStatus.INACTIVE
    }, {
      where: id
    })
    return true
  }
  list(condition: CategoryCondDTO, paging: PagingDTO): Promise<Array<CategoryDTO>> {
    throw new Error("Method not implemented.");
  }
  async insert(data: any): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data)
    return true
  }
  update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}