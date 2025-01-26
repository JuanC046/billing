import { z } from "zod";

export const customerSchema = z.object({
    identification_document_id: z.string().nonempty(),
    identification: z
        .string()
        .nonempty({
            message: "El numero de identificación es requerido",
        })
        .min(8, {
            message:
                "El numero de identificación debe tener al menos 8 caracteres",
        })
        .max(13, {
            message:
                "El numero de identificación debe tener como máximo 13 caracteres",
        }),
    dv: z.string().optional(),
    company: z.string().optional(),
    trade_name: z.string().optional(),
    names: z.string().nonempty({
        message: "El campo de nombres es requerido",
    }), // Changed to required
    address: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    legal_organization_id: z.string(),
    tribute_id: z.string(),
    municipality_id: z.string().optional(),
});
