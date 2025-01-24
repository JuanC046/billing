import { z } from "zod";

const withholding_taxSchema = z.object({
    code: z.string(),
    withholding_tax_rate: z.string(),
});
export const productSchema = z.object({
    code_reference: z
        .string({
            required_error: "Este campo es requerido",
        })
        .min(5, { message: "La longitud minima son 5 caracteres" })
        .max(15, { message: "La longitud maxima son 15 caracteres" }),
    name: z
        .string({
            required_error: "Este campo es requerido",
        })
        .min(5, { message: "La longitud minima son 5 caracteres" })
        .max(50, { message: "La longitud maxima son 50 caracteres" }),
    price: z
        .number({
            required_error: "Este campo es requerido",
        })
        .gt(0, { message: "El precio debe ser mayor a 0" })
        .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
            message: "El precio no puede tener más de 2 decimales",
        }),
    quantity: z.number().optional(),
    tax_rate: z
        .string({
            required_error: "Este campo es requerido",
        })
        .regex(/^\d{1,2}(\.\d{1,2})?$/, {
            message: "El impuesto no puede tener más de 2 decimales",
        }),
    discount_rate: z.number().optional(),
    unit_measure_id: z
        .number({
            required_error: "Este campo es requerido",
        })
        .int()
        .refine((val) => val > 0, {
            message: "Este campo es requerido",
        }),
    standard_code_id: z
        .number()
        .int()
        .refine((val) => val > 0, {
            message: "Este campo es requerido",
        }),
    is_excluded: z
        .number({
            required_error: "Este campo es requerido",
        })
        .int()
        .min(0)
        .max(1),
    tribute_id: z
        .number({
            required_error: "Este campo es requerido",
        })
        .int(),
    withholding_taxes: z.array(withholding_taxSchema).optional(),
});
