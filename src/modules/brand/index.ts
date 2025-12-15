import { Sequelize } from "sequelize";
import { Router } from "express";
import { init, modelName } from "./infras/repository/sequelize/dto";
import { MYSQLBrandRepository } from "./infras/repository/sequelize";
import { BrandUsecase } from "./usecase";
import { BrandHttpService } from "./infras/transport";
import { CreateBrandCmdHandler } from "./usecase/create-brand";
import { GetDetailBrandQuery } from "./usecase/get-detail-brand";
import { UpdateBrandCmdHandler } from "./usecase/update-brand";

export const setupBrandHexagon = (sequelize : Sequelize) => {

  //Hexagonal
  // Model|Usecase
  //B1: tao model, khai bao model, 1 so dto create update cond
  //B2: tao usecase ( service)
  // Usecase va model khong can care den ben ngoai, chu yeu la cac bussiness logic
  //B3: tao infras ( controller): Ben trai (transport), Ben phai (Repository)
  init(sequelize)
  // code uc va repo truoc
  const repository = new MYSQLBrandRepository(sequelize)
  const useCase = new BrandUsecase(repository)

  const createCmdHandler = new CreateBrandCmdHandler(repository)
  const getDetailQueryHandler = new GetDetailBrandQuery(repository)
  const updateCmdHandler = new UpdateBrandCmdHandler(repository)
  
  const httpService = new BrandHttpService(
    useCase,
    createCmdHandler,
    getDetailQueryHandler,
  updateCmdHandler
)
  const route = Router()

  route.post('/brands', httpService.createAPI.bind(httpService))
  route.get('/brands/:id', httpService.getDetailAPI.bind(httpService))
}