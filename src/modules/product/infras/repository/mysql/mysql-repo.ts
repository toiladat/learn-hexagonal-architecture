import { Sequelize } from "sequelize";
import { ProductCondDTO, ProductCreateDTO, ProductUpdateDTO } from "../../../model/dto";
import { BaseCommandRepositorySequelize, BaseQueryRepositorySequelize, BaseRepositorySequelize } from "@share/repository/base-repo-sequelize";
import { Product } from "@/modules/product/model/model";
import { BrandPersistence, CategoryPersistence } from "./dto";

export class MySQLProductRepository extends BaseRepositorySequelize<Product, ProductCondDTO, ProductUpdateDTO> {
  constructor(readonly sequelize: Sequelize, readonly modelName: string) {
    super(
      new MySQLProductQueryRepository(sequelize, modelName),
      new MySQLProductCommandRepository(sequelize, modelName),
    );
  }
}

export class MySQLProductQueryRepository extends BaseQueryRepositorySequelize<Product, ProductCondDTO> {
  constructor(readonly sequelize: Sequelize, readonly modelName: string) {
    super(sequelize, modelName);
  }

  //   //override
  //   // link to db thi khong phai micro
  //   async get(id: string): Promise<Product | null> {
  //   const data = await this.sequelize.models[this.modelName]?.findOne({
  //     where: {id},
  //     include: [
  //       {model: CategoryPersistence, as: 'category'},
  //       {model: BrandPersistence, as: 'brand'}
  //     ]
  //   })
  //   if(!data) return null
  //   const persistenceData = data.get({ plain: true})

  //   const {created_at, updated_at, ...props}= persistenceData
  //   return {
  //     ...props,
  //     createdAt: created_at,
  //     updatedAt: updated_at,
  //   } as Product
  // }
  
}

export class MySQLProductCommandRepository extends BaseCommandRepositorySequelize<Product, ProductUpdateDTO> {
  constructor( sequelize: Sequelize,  modelName: string) {
    super(sequelize, modelName);
  }
}