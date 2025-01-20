"use client";
import { useState } from "react";

import Form from "next/form";
import TextField from "@mui/material/TextField";
// import styles from "./Form.module.css";
import { itemSchema } from "@/schemas/item";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import measures from "@/data/static/measures.json";
import standard_code from "@/data/static/standard_code.json";
interface Withholding_taxSchema {
    code: number;
    withholding_tax_rate: number;
    [key: string]: string | number | Withholding_taxSchema[] | undefined;
}
interface FormData {
    code_reference: string;
    name: string;
    price: number;
    tax_rate: string;
    unit_measure_id: number;
    standard_code_id: number;
    is_excluded: number;
    tribute_id: number;
    withholding_taxes?: Withholding_taxSchema[];
}

export default function ProductPage() {
    const [formData, setFormData] = useState<FormData>({
        code_reference: "",
        name: "",
        price: 0,
        tax_rate: "",
        unit_measure_id: 0,
        standard_code_id: 0,
        is_excluded: 0,
        tribute_id: 0,
        withholding_taxes: [],
    });
    const [formErrors, setFormErrors] = useState({
        code_reference: "",
        name: "",
        price: "",
        tax_rate: "",
        unit_measure_id: "",
        standard_code_id: "",
        is_excluded: "",
        tribute_id: "",
        withholding_taxes: "",
    });
    const parseValue = (name: string, value: string): number | string => {
        return [
            "price",
            "unit_measure_id",
            "standard_code_id",
            "is_excluded",
            "tribute_id",
        ].includes(name)
            ? Number(value)
            : value;
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        console.log(name, value);
        console.log(typeof value);
        setFormData({
            ...formData,
            [name]: parseValue(name, value),
        });
    };
    const handleChangeSelect = (event: SelectChangeEvent): void => {
        const { name, value } = event.target;
        console.log(name, value);
        console.log(typeof value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const result = itemSchema.pick({ [name]: true }).safeParse({
            [name]: parseValue(name, value),
        });
        if (result.success) {
            setFormErrors({
                ...formErrors,
                [name]: "",
            });
        } else {
            setFormErrors({
                ...formErrors,
                [name]: result.error.errors[0].message,
            });
        }
    };
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        const data: FormData = {
            code_reference: formData["code_reference"],
            name: formData["name"],
            price: formData["price"],
            tax_rate: formData["tax_rate"],
            unit_measure_id: formData["unit_measure_id"],
            standard_code_id: formData["standard_code_id"],
            is_excluded: formData["is_excluded"],
            tribute_id: formData["tribute_id"],
            withholding_taxes: formData["withholding_taxes"],
        };
        console.log("Data", data);
        const result = itemSchema.safeParse(data);
        console.log(typeof result.error, result.error);
        if (result.success) {
            console.log(data);
        } else {
            const errors = result.error.errors.reduce(
                (
                    acc: Record<string, string>,
                    curr: { path: (string | number)[]; message: string }
                ) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                },
                {}
            );
            setFormErrors({
                code_reference: errors.code_reference || "",
                name: errors.name || "",
                price: errors.price || "",
                tax_rate: errors.tax_rate || "",
                unit_measure_id: errors.unit_measure_id || "",
                standard_code_id: errors.standard_code_id || "",
                is_excluded: errors.is_excluded || "",
                tribute_id: errors.tribute_id || "",
                withholding_taxes: errors.withholding_taxes || "",
            });
        }
    };

    return (
        <Form
            action=""
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                gap: "10px",
            }}
            onSubmit={handleSubmit}
        >
            <TextField
                label="Codigo de referencia"
                name="code_reference"
                value={formData["code_reference"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["code_reference"])}
                helperText={formErrors["code_reference"]}
                type="number"
            />
            <TextField
                label="Nombre"
                name="name"
                value={formData["name"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["name"])}
                helperText={formErrors["name"]}
                type="text"
            />
            <TextField
                label="Precio"
                name="price"
                value={Number(formData["price"])}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["price"])}
                helperText={formErrors["price"]}
                type="number"
            />
            <TextField
                label="Tasa de impuesto"
                name="tax_rate"
                value={formData["tax_rate"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["tax_rate"])}
                helperText={formErrors["tax_rate"]}
                type="number"
            />
            <FormControl fullWidth>
                <InputLabel id="unit_measure_id">Unidad de medida</InputLabel>
                <Select
                    labelId="unit_measure_id"
                    id="unit_measure_id"
                    name="unit_measure_id"
                    value={formData["unit_measure_id"].toString()}
                    label="Unidad de medida"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["unit_measure_id"])}
                    onBlur={handleBlur}
                >
                    <MenuItem value="0" disabled>
                        Selecciona una unidad de medida
                    </MenuItem>
                    {measures.data.map((measure) => (
                        <MenuItem key={measure.id} value={measure.id}>
                            {measure.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{formErrors["unit_measure_id"]}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="standard_code_id">Codigo estandar</InputLabel>
                <Select
                    labelId="standard_code_id"
                    id="standard_code_id"
                    name="standard_code_id"
                    value={formData["standard_code_id"].toString()}
                    label="Unidad de medida"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["standard_code_id"])}
                    onBlur={handleBlur}
                >
                    <MenuItem value="0" disabled>
                        Seleccione un codigo estandar de producto
                    </MenuItem>
                    {standard_code.data.map((measure) => (
                        <MenuItem key={measure.id} value={measure.id}>
                            {measure.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {formErrors["standard_code_id"]}
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="is_excluded">Excluido de iva</InputLabel>
                <Select
                    labelId="is_excluded"
                    id="is_excluded"
                    name="is_excluded"
                    value={formData["is_excluded"].toString()}
                    label="Excluido de iva"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["is_excluded"])}
                    onBlur={handleBlur}
                >
                    <MenuItem value={0}>No</MenuItem>
                    <MenuItem value={1}>Si</MenuItem>
                </Select>
                <FormHelperText>{formErrors["is_excluded"]}</FormHelperText>
            </FormControl>
            <Button type="submit">Enviar</Button>
        </Form>
    );
}
