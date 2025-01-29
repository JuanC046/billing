"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import AlertDialog from "@/components/Dialog";
import measures from "@/data/static/measures.json";
import standard_code from "@/data/static/standard_code.json";

import { ProductInterface as FormDataInteface } from "@/interfaces/product";
import { productSchema as formDataSchema } from "@/schemas/product";

import useForm from "@/hooks/useForm";

const initialFormData: FormDataInteface = {
    code_reference: "",
    name: "",
    price: 0,
    discount_rate: 0,
    tax_rate: "",
    unit_measure_id: 0,
    standard_code_id: 0,
    is_excluded: 0,
    tribute_id: 1,
    withholding_taxes: [],
};
const initialFormErrors: Record<string, string> = {
    code_reference: "",
    name: "",
    price: "",
    tax_rate: "",
    unit_measure_id: "",
    standard_code_id: "",
    is_excluded: "",
    tribute_id: "",
    withholding_taxes: "",
};
export default function ProductPage() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const numberElements = [
        "price",
        "unit_measure_id",
        "standard_code_id",
        "is_excluded",
        "tribute_id",
    ];
    const {
        formData,
        formErrors,
        handleChange,
        handleChangeSelect,
        handleBlur,
        handleValidation,
        handleClear,
    } = useForm<FormDataInteface>(
        initialFormData,
        numberElements,
        formDataSchema,
        initialFormErrors
    );
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = handleValidation();
        if (!data) {
            return;
        }
        try {
            console.log("Sending data to the server...");
            console.log(data);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log("Success:", responseData);
            setDialogOpen(true);
            handleClear();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <main>
            <h2>Creación de producto</h2>
            <Form action="" className={styles.form} onSubmit={handleSubmit}>
                <TextField
                    label="Codigo de referencia"
                    name="code_reference"
                    value={formData["code_reference"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(formErrors["code_reference"])}
                    helperText={formErrors["code_reference"]}
                    type="number"
                    className={styles["code_reference"]}
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
                    className={styles["name"]}
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
                    className={styles["price"]}
                />
                <FormControl
                    className={styles["unit_measure_id"]}
                    error={Boolean(formErrors["unit_measure_id"])}
                >
                    <InputLabel id="unit_measure_id">
                        Unidad de medida
                    </InputLabel>
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
                    <FormHelperText>
                        {formErrors["unit_measure_id"]}
                    </FormHelperText>
                </FormControl>
                <FormControl
                    className={styles["standard_code_id"]}
                    error={Boolean(formErrors["standard_code_id"])}
                    fullWidth
                >
                    <InputLabel id="standard_code_id">
                        Codigo estandar
                    </InputLabel>
                    <Select
                        labelId="standard_code_id"
                        id="standard_code_id"
                        name="standard_code_id"
                        value={formData["standard_code_id"].toString()}
                        label="Codigo estandar"
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
                <FormControl
                    className={styles["is_excluded"]}
                    error={Boolean(formErrors["is_excluded"])}
                    fullWidth
                >
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
                    <FormHelperText classes={styles["helper-text"]}>
                        {formErrors["is_excluded"]}
                    </FormHelperText>
                </FormControl>
                <TextField
                    label="Tasa de impuesto"
                    name="tax_rate"
                    value={formData["tax_rate"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(formErrors["tax_rate"])}
                    helperText={formErrors["tax_rate"]}
                    type="number"
                    className={styles["tax_rate"]}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={styles["button-submit"]}
                    type="submit"
                >
                    Agregar producto
                </Button>
            </Form>
            <AlertDialog
                open={dialogOpen}
                handleClose={setDialogOpen}
                title="Producto creado"
                subtitle="El producto ha sido creado con exito"
            />
        </main>
    );
}
