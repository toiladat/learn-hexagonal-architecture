import { ZodError } from "zod";
import { CreateCommand, IBrandRepository } from "../interface";
import { BrandDTO, BrandSchema } from "../model/model";
import { ErrorBrandNameTooShort } from "../model/error";
import { v7 } from "uuid";
import { ICommandHandler } from "@/share/interface";

export class CreateBrandCmdHandler implements ICommandHandler<CreateCommand, string> {

  constructor(
    private readonly repository: IBrandRepository
  ){}
  
  async execute(command: CreateCommand): Promise<string> {
 //validate
    const {success, error, data: parsedData} = BrandSchema.safeParse(command.cmd)
    //TODO: process error
    if( error) {
      const nameError = (error as ZodError).issues.find((issue)=> issue.path[0] === 'name')
      if (nameError) {
        throw ErrorBrandNameTooShort
      }
      throw error
    }    

    const newId= v7()
    const category: BrandDTO= {
      ...parsedData,
      id: newId,
      otherBusinessFields: ''
    }
    const result =  this.repository.insert(category)
    return newId  }

}