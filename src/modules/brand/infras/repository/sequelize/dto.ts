import { DataTypes, Model, Sequelize } from "sequelize";

export class BrandPersistence extends Model{

  //Neu dung generate id autoincrement thi declare, khong thi thoi
  //O day thi thoi
  declare id:string
}
//ModelName khai bao o day cung duoc hoac o model cung duoc
//Nen o dto hon

export const modelName = 'Brand'

export function init(sequelize: Sequelize){
  BrandPersistence.init( {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName:modelName,
    tableName: 'brands',
    timestamps: true,
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)
}