
import { Sequelize, where,Op } from 'sequelize';
import { ICommandRepository, IQueryRepository, IRepository } from '../interface';
import { ModelStatus } from '../model/base-model';
import { PagingDTO } from '../model/paging';

export abstract class  BaseRepositorySequelize<Entity, Cond, UpdateDTO>implements IRepository<Entity, Cond, UpdateDTO> {
  constructor(
    readonly queryRepo: IQueryRepository<Entity, Cond>,
    readonly cmdRepo: ICommandRepository<Entity, UpdateDTO>
  ) {
    
  }
  async get(id: string): Promise<Entity | null> {
    return await this.queryRepo.get(id)
  }
  async list(condition: Cond, paging: PagingDTO): Promise<Entity[]> {
    return await this.queryRepo.list(condition,paging)
  }
  async findByCond(cond: Cond): Promise<Entity | null> {
    return await this.queryRepo.findByCond(cond)
  }
  async insert(data: Entity): Promise<boolean> {
    return this.cmdRepo.insert(data)
  }
  async update(id: string, data: UpdateDTO): Promise<boolean> {
    return this.cmdRepo.update(id,data)
  }
  async delete(id: string, isHard: boolean): Promise<boolean> {
    return await this.cmdRepo.delete(id, isHard)
  }
}

export abstract class  BaseQueryRepositorySequelize<Entity, Cond> implements IQueryRepository<Entity, Cond> {
  constructor(
     readonly sequelize: Sequelize,
     readonly modelName: string 
  ) {}
  async get(id: string): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName]?.findByPk(id)
    if(!data) return null
    const persistenceData = data.get({ plain: true})

    const {created_at, updated_at, ...props}= persistenceData
    return {
      ...props,
      createdAt: created_at,
      updatedAt: updated_at,
    } as Entity
  }
  async list(condition: Cond, paging: PagingDTO): Promise<Entity[]> {
    const page = paging.page ?? 1
    const limit = paging.limit ?? 10
    const offset = (page - 1) * limit

    const condSQL = {
      ...condition,
      status: {
        [Op.ne]: ModelStatus.INACTIVE
      }
    }

    const model = this.sequelize.models[this.modelName]
    if (!model) {
      throw new Error(`Model ${this.modelName} not found`)
    }

    const total = await model.count({
      where: condSQL
    })

    const rows = await model.findAll({
      where: condSQL,
      limit,
      offset,
      order: [['createdAt', 'DESC']] // optional
    })

    return rows.map(row => row.get({plain: true}))
  }

  async findByCond(cond: Cond): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName]?.findOne({where: cond as any})
    if(!data) return null
    const persistenceData = data.get({plain: true})
    return persistenceData as Entity  }
}

export abstract class  BaseCommandRepositorySequelize<Entity, UpdateDTO> implements ICommandRepository<Entity,UpdateDTO> {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string 
  ) {}

  async insert(data: Entity): Promise<boolean> {
    await this.sequelize.models[this.modelName]?.create(data as any)
    return true
  }
  async update(id: string, data: UpdateDTO): Promise<boolean> {
    await this.sequelize.models[this.modelName]?.update(
      data as any,
      {where: {id}}
    )
    return true
  }
   async delete(id: string, isHard: boolean): Promise<boolean> {
    if(isHard)
      await this.sequelize.models[this.modelName]?.destroy({where: {id}})

    await this.sequelize.models[this.modelName]?.update({
      status:ModelStatus.INACTIVE
    }, {where: {id}})
    return true
  }
}
//abstract de ben ngoai override lai theo dung logic 
// export abstract class BaseRepositorySequelize<Entity,Cond, UpdateDTO> implements IRepository<Entity,Cond, UpdateDTO>{
//   constructor(
//     private readonly sequelize: any,
//     private readonly modelName: string
//   ){
    
//   }
//   findByCond(cond: Cond): Promise<Entity | null> {
//     // find === thi dung method nay
//     throw new Error('Method not implemented.');
//   }
  
//   async get(id: string): Promise<Entity | null> {
//     const data =await this.sequelize.models[this.modelName].findByPk(id)
//     if(!data) {
//         return null
//     }

//     //DB la created_at & updated_at
//     //Model la createdAt & updatedAt
//     //viet ham xu ly thi hon
//     const persistenceData = (data.get({
//       plain:true
//     }))
//     return {
//       ...persistenceData,
//       createdAt: persistenceData.created_at,
//       updatedAt: persistenceData.created_at,
//     } as Entity
//   }

//   async delete (id: string, isHard:boolean = false): Promise<boolean>{
//     if (isHard) {
//        await this.sequelize.models[this.modelName].destroy({
//         id
//       })
//     }
//      await this.sequelize.models[this.modelName].update({
//       status: ModelStatus.INACTIVE
//     }, {
//       where: id
//     })
//     return true
//   }
//   list(condition: Cond, paging: PagingDTO): Promise<Array<Entity>> {
//     throw new Error("Method not implemented.");
//   } 

//   async insert(data: Entity): Promise<boolean> {
//     await this.sequelize.models[this.modelName].create(data)
//     return true
//   }
//   update(id: string, data: UpdateDTO): Promise<boolean> {
//     throw new Error("Method not implemented.");
//   }

// }