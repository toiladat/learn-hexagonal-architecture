
import { where } from 'sequelize';
import { IQueryRepository, IRepository } from '../interface';
import { ModelStatus } from '../model/base-model';
import { PagingDTO } from '../model/paging';

//abstract de ben ngoai override lai theo dung logic 
export abstract class BaseRepositorySequelize<Entity,Cond, UpdateDTO> implements IRepository<Entity,Cond, UpdateDTO>{
  constructor(
    private readonly sequelize: any,
    private readonly modelName: string
  ){
    
  }
  findByCond(cond: Cond): Promise<Entity | null> {
    // find === thi dung method nay
    throw new Error('Method not implemented.');
  }
  
  async get(id: string): Promise<Entity | null> {
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
      createdAt: persistenceData.created_at,
      updatedAt: persistenceData.created_at,
    } as Entity
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
  list(condition: Cond, paging: PagingDTO): Promise<Array<Entity>> {
    throw new Error("Method not implemented.");
  }

  async insert(data: Entity): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data)
    return true
  }
  update(id: string, data: UpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}