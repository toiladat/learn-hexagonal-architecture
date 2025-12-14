import z from "zod";
import { ModelStatus } from "../../../share/model/base-model";

export const CategoryCreateSchema = z.object({
  name:z.string(),
  image: z.string().optional(),
  description:z.string().optional(),
  status: z.enum(ModelStatus).optional()
})
export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>

export const CategoryUpdateSchema = z.object({
  name:z.string(),
  image: z.string().optional(),
  description:z.string().optional(),
  status: z.enum(ModelStatus).optional()
})

export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>


export const CategoryCondSchema = z.object({
  name:z.string(),
  description:z.string().optional()
})
export type CategoryCondDTO = z.infer<typeof CategoryCondSchema>
