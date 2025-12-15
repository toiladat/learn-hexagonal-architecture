import { IQueryHandler, IQueryRepository } from "../../../share/interface";
import { ErrorDataNotFound } from "../../../share/model/base-error";
import { ModelStatus } from "../../../share/model/base-model";
import { GetDetailQuery, IBrandRepository } from "../interface";
import { BrandCondDTO } from "../model/dto";
import { ErrorBrandNameTooShort } from "../model/error";
import { BrandDTO } from "../model/model";

export class GetDetailBrandQuery implements IQueryHandler<GetDetailQuery, BrandDTO>{
  constructor(  
    private readonly repository: IBrandRepository
  ){}

  async query(query: GetDetailQuery): Promise<BrandDTO> {
    const data= await this.repository.get(query.id)
    if(!data)
      throw ErrorDataNotFound
    return data
  }
}