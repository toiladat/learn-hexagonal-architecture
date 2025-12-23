import { DataTypes, Model, Sequelize } from "sequelize";
import { ModelStatus } from "@share/model/base-model";
import { ProductGender } from "@/modules/product/model/model";

export class ProductPersistence extends Model {}
export class CategoryPersistence extends Model {}
export class BrandPersistence extends Model {}

//Nhung link to DB thi khong phai micro nhe
export const modelName = "Product";

export function init(sequelize: Sequelize) {
  ProductPersistence.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      // Hoàn thiện các trường còn lại dựa trên schema
      price: { type: DataTypes.DOUBLE, allowNull: false },
      salePrice: { type: DataTypes.DOUBLE, defaultValue: 0 },
      quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
      gender: { 
        type: DataTypes.ENUM(...Object.values(ProductGender)), 
        defaultValue: ProductGender.UNISEX 
      },
      status: { 
        type: DataTypes.ENUM(...Object.values(ModelStatus)), 
        defaultValue: ModelStatus.ACTIVE 
      },
      brandId: { type: DataTypes.STRING, allowNull: true },
      categoryId: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName,
      tableName: "products",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  // // --- Khởi tạo CategoryPersistence ---
  // CategoryPersistence.init(
  //   {
  //     id: {
  //       type: DataTypes.STRING,
  //       primaryKey: true,
  //     },
  //     name: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //   },
  //   {
  //     sequelize,
  //     modelName: 'ProductCategory', //
  //     tableName: 'categories',      //
  //     createdAt: false,             //
  //     updatedAt: false,             //
  //   }
  // );

  // // --- Khởi tạo BrandPersistence ---
  // // (Dựa trên cấu trúc tương tự Category vì hình ảnh không hiển thị chi tiết Brand)
  // BrandPersistence.init(
  //   {
  //     id: {
  //       type: DataTypes.STRING,
  //       primaryKey: true,
  //     },
  //     name: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //   },
  //   {
  //     sequelize,
  //     modelName: 'ProductBrand',
  //     tableName: 'brands',
  //     createdAt: false,
  //     updatedAt: false,
  //   }
  // );  


  // // Thiết lập mối quan hệ cho Product
  // // Một Sản phẩm thuộc về một Danh mục
  // ProductPersistence.belongsTo(CategoryPersistence, { 
  //   foreignKey: { field: 'category_id' }, 
  //   as: 'category' 
  // });

  // // Một Sản phẩm thuộc về một Thương hiệu
  // ProductPersistence.belongsTo(BrandPersistence, { 
  //   foreignKey: { field: 'brand_id' }, 
  //   as: 'brand' 
  // });

}