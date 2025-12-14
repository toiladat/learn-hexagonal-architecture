import z from "zod";
import { ModelStatus } from "../../../share/model/base-model";

export const CategorySchema = z.object({
    id:z.string(),
    name:z.string(),
    image: z.string().optional(),
    description:z.string().optional(),
    otherBusinessFields: z.string(),
    status: z.enum(ModelStatus).optional()
    
})

//Custom them children fields
// & merge 2 type 
export type CategoryDTO = z.infer<typeof CategorySchema> &{ children?: CategoryDTO[]}