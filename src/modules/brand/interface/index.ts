import { BrandDTO, BrandSchema } from './../model/model';
import { PagingDTO } from "../../../share/model/paging";
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO } from "../model/dto";
import { IRepository } from '../../../share/interface';

//Interface for Usecase
export interface IBrandUsecase{
  create(data: BrandCreateDTO): Promise<string>
  get(id: string): Promise<BrandDTO | null>
  update(id: string, data: BrandUpdateDTO): Promise<boolean>
  delete(id: string): Promise<boolean>
  list(cond: BrandCondDTO, pag: PagingDTO): Promise<Array<BrandDTO>>
}

export interface CreateCommand{ // Muon co bao nhieu ham thuc thi thi tao bay nhieu kieu, ten ham + DTO
  cmd: BrandCreateDTO
}
export interface UpdateCommand{
  id: string,
  payload: BrandUpdateDTO
}


export interface GetDetailQuery {
  id: string
}


export interface IBrandRepository extends IRepository<BrandDTO, BrandCondDTO, BrandUpdateDTO>{}