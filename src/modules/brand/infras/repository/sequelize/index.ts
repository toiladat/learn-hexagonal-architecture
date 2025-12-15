import { Sequelize } from 'sequelize';
import { BaseRepositorySequelize } from "../../../../../share/repository/base-repo-sequelize";
import { BrandCondDTO, BrandUpdateDTO } from "../../../model/dto";
import { BrandDTO } from "../../../model/model";
import { modelName } from './dto';

export class MYSQLBrandRepository extends BaseRepositorySequelize<BrandDTO, BrandCondDTO, BrandUpdateDTO>{
  constructor( sequelize: Sequelize,){
    super(sequelize, modelName)
  }

  // overide lai method neu muon custom
    async get(id: string): Promise<BrandDTO | null> {
      return null
    }
}