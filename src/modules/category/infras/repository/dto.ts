import { DataTypes, Model, Sequelize } from "sequelize";

export class CategoryPersistence extends Model{
  declare id:string
  declare status: string
}
export const modelName = 'Category'

export function init(sequelize: Sequelize){
  CategoryPersistence.init( {
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
    tableName: modelName,
    timestamps: true,
    sequelize
  }
)
}