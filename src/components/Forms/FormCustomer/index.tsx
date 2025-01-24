"use client";
import styles from "./FormCustomer.module.css";
import Form from "next/form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select , { SelectChangeEvent } from "@mui/material/Select";

import { CustomerInterface } from "@/interfaces/customer";

import document_types from "@/data/static/document_types.json";


interface FormCustomerProps {
    children?: React.ReactNode;
    formData: CustomerInterface;
    formErrors: Record<string, string>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleChangeSelect: (event: SelectChangeEvent) => void;
}
export default function FormCustomer({
    children,
    formData,
    formErrors,
    handleChange,
    handleBlur,
    handleChangeSelect,
}: FormCustomerProps) {
    return (
        <Form action="" className={styles.form}>
            <FormControl className={styles["identification_document_id"]}>
                <InputLabel id="identification_document_id">
                    Tipo de documento
                </InputLabel>
                <Select
                    labelId="identification_document_id"
                    id="identification_document_id"
                    name="identification_document_id"
                    value={formData["identification_document_id"].toString()}
                    label="Tipo de documento"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["identification_document_id"])}
                    onBlur={handleBlur}
                >
                    {document_types.data.map((document) => (
                        <MenuItem key={document.id} value={document.id}>
                            {document.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {formErrors["identification_document_id"]}
                </FormHelperText>
            </FormControl>
            <TextField
                label="Numero de documento"
                name="identification"
                value={formData["identification"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["identification"])}
                helperText={formErrors["identification"]}
                type="number"
                className={styles["identification"]}
            />
            <TextField
                label="Digito de verificación"
                name="dv"
                value={formData["dv"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["dv"])}
                helperText={formErrors["dv"]}
                type="number"
                className={styles["dv"]}
                disabled={formData["identification_document_id"] !== "6"}
            />
            <FormControl
                className={styles["legal_organization_id"]}
                error={Boolean(formErrors["legal_organization_id"])}
            >
                <InputLabel id="legal_organization_id">
                    Tipo de organización
                </InputLabel>
                <Select
                    labelId="legal_organization_id"
                    id="legal_organization_id"
                    name="legal_organization_id"
                    value={formData["legal_organization_id"].toString()}
                    label="Tipo de organización"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["legal_organization_id"])}
                    onBlur={handleBlur}
                >
                    <MenuItem value="1">Persona juridica - Empresa</MenuItem>
                    <MenuItem value="2">Persona natural</MenuItem>
                </Select>
                <FormHelperText>
                    {formErrors["legal_organization_id"]}
                </FormHelperText>
            </FormControl>
            <TextField
                label="Nombre de la empresa"
                aria-label="Razon social"
                name="company"
                value={formData["company"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["company"])}
                helperText={formErrors["company"]}
                type="text"
                className={styles["company"]}
                disabled={formData["legal_organization_id"] !== "1"}
            />
            <TextField
                label="Nombre comercial (opcional)"
                name="trade_name"
                value={formData["trade_name"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["trade_name"])}
                helperText={formErrors["trade_name"]}
                type="text"
                className={styles["trade_name"]}
            />
            <TextField
                label="Nombres"
                name="names"
                value={formData["names"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["names"])}
                helperText={formErrors["names"]}
                type="text"
                className={styles["names"]}
                disabled={formData["legal_organization_id"] !== "2"}
            />
            <TextField
                label="Correo electronico"
                name="email"
                value={formData["email"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["email"])}
                helperText={formErrors["email"]}
                type="email"
                className={styles["email"]}
            />
            <TextField
                label="Telefono"
                name="phone"
                value={formData["phone"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["phone"])}
                helperText={formErrors["phone"]}
                type="tel"
                className={styles["phone"]}
            />
            <TextField
                label="Dirección"
                name="address"
                value={formData["address"]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formErrors["address"])}
                helperText={formErrors["address"]}
                type="text"
                className={styles["address"]}
            />
            <FormControl
                className={styles["tribute_id"]}
                error={Boolean(formErrors["tribute_id"])}
                fullWidth
            >
                <InputLabel id="tribute_id">Tipo de tributo</InputLabel>
                <Select
                    labelId="tribute_id"
                    id="tribute_id"
                    name="tribute_id"
                    value={formData["tribute_id"].toString()}
                    label="Tipo de tributo"
                    onChange={handleChangeSelect}
                    error={Boolean(formErrors["tribute_id"])}
                    onBlur={handleBlur}
                >
                    <MenuItem value="18">IVA</MenuItem>
                    <MenuItem value="21">No aplica</MenuItem>
                </Select>
                <FormHelperText>{formErrors["tribute_id"]}</FormHelperText>
            </FormControl>
            {/* <FormControl
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
                </FormControl> */}
            {children}
        </Form>
    );
}
