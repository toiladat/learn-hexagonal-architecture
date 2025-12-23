import { Sequelize } from "sequelize";
import { Router } from "express";
import { init, modelName } from "./infras/repository/mysql/dto";
import { MySQLProductRepository } from "./infras/repository/mysql/mysql-repo";
import { ProductUseCase } from "./usecase";
import { ProductHTTPService } from "./infras/transport/http-service";
import { ProxyProductBrandRepository, RPCProductBrandREpository, RPCProductCategoryRepository } from "./infras/repository/rpc";
import { config } from "@/share/component/config";

export const setupBrandHexagon = (sequelize : Sequelize) => {

  //Hexagonal
  // Model|Usecase
  //B1: tao model, khai bao model, 1 so dto create update cond
  //B2: tao usecase ( service)
  // Usecase va model khong can care den ben ngoai, chu yeu la cac bussiness logic
  //B3: tao infras ( controller): Ben trai (transport), Ben phai (Repository)
  init(sequelize)
  // code uc va repo truoc
  const repository = new MySQLProductRepository(sequelize, modelName)

  const productBrandRepository = new RPCProductBrandREpository(config.rpc.productBrand)
  const proxyProductBrandRepository = new ProxyProductBrandRepository( new RPCProductBrandREpository(config.rpc.productBrand))

  const productCategoryRepository = new RPCProductCategoryRepository(config.rpc.productCategory)
  //UC: Co the call service khac o day
  const useCase = new ProductUseCase(repository, proxyProductBrandRepository,productCategoryRepository)

  //INFRAS: Co the call service khac o day, neu la smart web gi do khong nho ro
  const httpService = new ProductHTTPService(
    useCase,
    productBrandRepository,
    productCategoryRepository
)
  const route = Router()

  route.post('/products', httpService.createAPI.bind(httpService))
  route.get('/products/:id', httpService.getDetalAPI.bind(httpService))
}