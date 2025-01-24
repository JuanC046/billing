"use client";
import styles from "./FormBill.module.css";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { BaseBillInterface } from "@/interfaces/bill";

import numeration_ranges from "@/data/static/numeration_ranges.json";
import payment_methods from "@/data/static/payment_methods.json";


interface FormBillProps {
    children?: React.ReactNode;
    formData: BaseBillInterface;
    formErrors: Record<string, string>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleChangeSelect: (event: SelectChangeEvent) => void;
}
export default function FormBill({ children, formData, formErrors, handleChange, handleBlur, handleChangeSelect}: FormBillProps) {
    return (
        <Form action="" className={styles.form}>
            <FormControl className={styles["numbering_range_id"]}>
                <InputLabel id="numbering_range_id">
                    Tipo de documento de facturacion
                </InputLabel>
                <Select
                    labelId="numbering_range_id"
                    id="numbering_range_id"
                    name="numbering_range_id"
                    value={formData["numbering_range_id"].toString()}
                    label="Tipo de documento de facturacion"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["numbering_range_id"])}
                    onBlur={handleBlur}
                >
                    {numeration_ranges.data.map((range) => (
                        <MenuItem key={range.id} value={range.id}>
                            {range.document}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {formErrors["numbering_range_id"]}
                </FormHelperText>
            </FormControl>
            <FormControl className={styles["numbering_range_id"]}>
                <InputLabel id="numbering_range_id">
                    Tipo de documento
                </InputLabel>
                <Select
                    labelId="document"
                    id="document"
                    name="document"
                    value={formData["document"].toString()}
                    label="Tipo de documento"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["document"])}
                    onBlur={handleBlur}
                >
                    <MenuItem value="01">Factura electronica de venta</MenuItem>
                    <MenuItem value="03">
                        Instrumento electrónico de transmisión
                    </MenuItem>
                </Select>
                <FormHelperText>{formErrors["document"]}</FormHelperText>
            </FormControl>
            <TextField
                label="Codigo de referencia"
                name="reference_code"
                value={formData["reference_code"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["reference_code"])}
                helperText={formErrors["reference_code"]}
                type="text"
                className={styles["reference_code"]}
                disabled
            />
            <TextField
                label="Observaciones"
                name="observation"
                value={formData["observation"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["observation"])}
                helperText={formErrors["observation"]}
                type="text"
                className={styles["observation"]}
            />
            <FormControl
                className={styles["payment_method_code"]}
                error={Boolean(formErrors["payment_method_code"])}
            >
                <InputLabel id="payment_method_code">Metodo de pago</InputLabel>
                <Select
                    labelId="payment_method_code"
                    id="payment_method_code"
                    name="payment_method_code"
                    value={formData["payment_method_code"].toString()}
                    label="Tipo de organización"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["payment_method_code"])}
                    onBlur={handleBlur}
                >
                    {payment_methods.data.map((method) => (
                        <MenuItem key={method.code} value={method.code}>
                            {method.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {formErrors["payment_method_code"]}
                </FormHelperText>
            </FormControl>
            {children}
        </Form>
    );
}
