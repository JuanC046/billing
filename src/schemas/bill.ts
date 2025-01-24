import { z } from "zod";
import { customerSchema } from "./customer";
import { productSchema } from "./product";

export const baseBillSchema = z.object({
    numbering_range_id: z.number().int(),
    document: z.string().optional(),
    reference_code: z.string().nonempty(),
    observation: z.string().optional(),
    payment_method_code: z.string().nonempty(),
});

export const billSchema = z.object({
    numbering_range_id: z.number().int(),
    document: z.string().optional(),
    reference_code: z.string().nonempty(),
    observation: z.string().optional(),
    payment_method_code: z.string().nonempty(),
    customer: customerSchema,
    items: z.array(productSchema),
});
