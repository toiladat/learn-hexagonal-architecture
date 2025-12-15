import { ICommandHandler, ICommandRepository, IRepository } from "../../../share/interface";
import { ErrorDataNotFound } from "../../../share/model/base-error";
import { ModelStatus } from "../../../share/model/base-model";
import { IBrandRepository, UpdateCommand } from "../interface";
import { BrandUpdateDTO, BrandUpdateSchema } from "../model/dto";
import { ErrorBrandNameDuplicate } from "../model/error";
import { BrandDTO } from "../model/model";

export class UpdateBrandCmdHandler implements ICommandHandler<UpdateCommand, void>{
  constructor(
    //neu can ca 2 repo query | cmd deu duoc o day inject constructor cai tong
    private readonly repository: IBrandRepository
  ){}
  async execute(cmd: UpdateCommand): Promise<void> {
    const {success, data: parsedData, error} = BrandUpdateSchema.safeParse(cmd.payload)
    if( !success)
      throw new Error('invalid')

    const brand = await this.repository.get(cmd.id)
    if(!brand || brand.status ===ModelStatus.INACTIVE)
      throw ErrorDataNotFound
    await this.repository.update(cmd.id, parsedData)
    return
  }
}