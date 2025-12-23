import { IRepository } from "@/share/interface";
import { IBrandQueryRepository, ICategoryQueryRepository, IProductUsecase } from "../interface";
import { Product, ProductGender } from "../model/model";
import { ProductCondDTO, ProductCondSchema, ProductCreateDTO, ProductCreateSchema, ProductUpdateDTO, ProductUpdateSchema } from "../model/dto";
import { v7 } from "uuid";
import { ModelStatus } from "@/share/model/base-model";
import { PagingDTO } from "@/share/model/paging";
import { ErrorDataNotFound } from "@/share/model/base-error";

export class ProductUseCase implements IProductUsecase {
  constructor(
    private readonly repository: IRepository<Product, ProductCondDTO, ProductUpdateDTO>,
    private readonly productBrandRepository: IBrandQueryRepository,
    private readonly productCategoryRepository:ICategoryQueryRepository
  ) {}
 
  async getDetail(id: string): Promise<{ id: string; name: string; gender: ProductGender; price: number; salePrice: number; quantity: number; rating: number; saleCount: number; status: ModelStatus; createdAt: Date; updatedAt: Date; colors?: string | undefined; brandId?: string | undefined; categoryId?: string | undefined; content?: string | undefined; description?: string | undefined; } | null> {
    const data = await this.repository.get(id)
    if( !data || data.status === ModelStatus.INACTIVE)
      throw ErrorDataNotFound
    return data
  }
  
  async update(id: string, data: ProductUpdateDTO): Promise<boolean> {
    const dto = ProductUpdateSchema.parse(data);

    const product = await this.repository.get(id);
    if (!product || product.status === ModelStatus.INACTIVE) {
      throw ErrorDataNotFound;
    }

    await this.repository.update(id, dto);

    return true;
  }

  async list(cond: ProductCondDTO, paging: PagingDTO): Promise<Product[]> {
    const parsedCond = ProductCondSchema.parse(cond);
    //get products truowc
    const ids: [string] = [""]
    const brands = this.productBrandRepository.listByIds(ids)
    // const categories=
    //ghep brand + category cho product o day
    return await this.repository.list(parsedCond, paging);
  }

  async delete(id: string): Promise<boolean> {
    const product = await this.repository.get(id);
    if (!product || product.status === ModelStatus.INACTIVE) {
      throw ErrorDataNotFound;
    }

    // Thực hiện soft delete bằng cách cập nhật status
    await this.repository.update(id, { status: ModelStatus.INACTIVE } as ProductUpdateDTO);

    return true;
  }

  async create(data: ProductCreateDTO): Promise<string> {
  // Validate dữ liệu đầu vào bằng Schema đã định nghĩa
  const dto = ProductCreateSchema.parse(data);

  if(dto.brandId){
    const brand = await this.productBrandRepository.get(dto.brandId)
    if(!brand)
      throw ErrorDataNotFound
  }

  if( dto.categoryId){
    const category = await this.productCategoryRepository.get(dto.categoryId)
    if(!category)
      throw ErrorDataNotFound
  }
  
  const newId = v7(); // Giả định sử dụng UUID v7
  const newProduct: Product = {
    ...dto,
    id: newId,
    status: ModelStatus.ACTIVE,
    rating: 0,
    saleCount: 0,
    gender: ProductGender.UNISEX,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Lưu sản phẩm vào cơ sở dữ liệu qua repository
  await this.repository.insert(newProduct);

  return newId;
  }
}

