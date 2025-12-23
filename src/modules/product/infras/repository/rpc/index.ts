import { IBrandQueryRepository, ICategoryQueryRepository } from "@/modules/product/interface";
import { ProductBrand, ProductBrandSchema, ProductCategory } from "@/modules/product/model/model";
import axios from "axios";

export class RPCProductBrandREpository implements IBrandQueryRepository{
  constructor(
    private readonly baseUrl : string
  ){}
  listByIds(ids: string[]): Promise<Array<ProductBrand>> {
    // lay ra ProductBrand ben kia
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<ProductBrand | null> {
    try {
      const {data } = await axios.get(` ${this.baseUrl}/v1/brands/${id}`)
      const brand = ProductBrandSchema.parse(data.data)
    return brand
    } catch (error) {
      console.error(error)
      return null
    }
  }

}

//Cache in memory
// proxy pattern
export class ProxyProductBrandRepository implements IBrandQueryRepository{
  constructor(
    private readonly origin: IBrandQueryRepository
  ){}
  listByIds(ids: string[]): Promise<Array<ProductBrand>> {
    // cache idss
    throw new Error("Method not implemented.");
  }
  private cached: Record<string, ProductBrand>= {};


  async get(id: string): Promise<ProductBrand | null> {
    try {
      if( this.cached[id]) return this.cached[id]

      const brand =await this.origin.get(id)
      if(brand)
        this.cached[id]= brand
      return brand
    } catch (error) {
      console.log(error);
      return null
      
    }
  }
  
  
}


export class RPCProductCategoryRepository implements ICategoryQueryRepository{
  constructor(
    private readonly baseUrl : string
  ){}
  async get(id: string): Promise<ProductCategory | null> {
    try {
      const {data } = await axios.get(` ${this.baseUrl}/v1/categories/${id}`)
      const category = ProductBrandSchema.parse(data.data)
    return category
    } catch (error) {
      console.error(error)
      return null
    }
  }

}