import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/repository/dto";
import { Router } from "express";
import { CategoryHttpService } from "./infras/transport/http-service";
import { CategoryUsecase } from "./usecase";
import { MYSQLCategoryRepository } from "./infras/repository/repo";

export const setupCategoryHexagon = (sequelize : Sequelize) => {

  //Hexagonal
  // Model|Usecase
  //B1: tao model, khai bao model, 1 so dto create update cond
  //B2: tao usecase ( service)
  // Usecase va model khong can care den ben ngoai, chu yeu la cac bussiness logic
  //B3: tao infras ( controller): Ben trai (transport), Ben phai (Repository)
  init(sequelize)
  // code uc va repo truoc
  const repository = new MYSQLCategoryRepository(sequelize, modelName)
  const useCase = new CategoryUsecase(repository)
  const httpService = new CategoryHttpService(useCase)
  const route = Router()

  route.post('/categories', httpService.createAPI.bind(httpService))
  route.get('/categories/:id', httpService.getDetailAPI.bind(httpService))
}