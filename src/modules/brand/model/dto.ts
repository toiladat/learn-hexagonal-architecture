import z from "zod";
import { ModelStatus } from "../../../share/model/base-model";
import { ErrorBrandNameTooShort } from "./error";

export const BrandCreateSchema = z.object({
  name:z.string().min(2, ErrorBrandNameTooShort.message),
  image: z.string().optional(),
  description:z.string().optional(),
})
export type BrandCreateDTO = z.infer<typeof BrandCreateSchema>

export const BrandUpdateSchema = z.object({
  name:z.string().optional(),
  image: z.string().optional(),
  description:z.string().optional(),
  status: z.enum(ModelStatus).optional()
})

export type BrandUpdateDTO = z.infer<typeof BrandUpdateSchema>


export const BrandCondSchema = z.object({
  name:z.string(),
  description:z.string().optional()
})
export type BrandCondDTO = z.infer<typeof BrandCondSchema>
