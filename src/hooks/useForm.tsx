import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { z } from "zod";
export default function useForm<T>(
    initialState: T,
    schema: z.ZodObject<z.ZodRawShape>,
    initialErrors: Record<string, string>
) {
    const [formData, setFormData] = useState<T>({
        ...initialState,
    });
    const [formErrors, setFormErrors] = useState({
        ...initialErrors,
    });
    const parseValueType = (name: string, value: string): number | string => {
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
        setFormData({
            ...formData,
            [name]: parseValueType(name, value),
        });
    };
    const handleChangeSelect = (event: SelectChangeEvent): void => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const result = schema.pick({ [name]: true }).safeParse({
            [name]: parseValueType(name, value),
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
    const processZodErrors = (
        zodErrors: z.ZodError
    ): Record<string, string> => {
        return zodErrors.errors.reduce(
            (
                acc: Record<string, string>,
                curr: { path: (string | number)[]; message: string }
            ) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            },
            {}
        );
    };

    const normalizeErrors = (
        errors: Record<string, string>
    ): Record<string, string> => {
        return Object.keys(initialErrors).reduce((acc, key) => {
            acc[key] = errors[key] || "";
            return acc;
        }, {} as Record<string, string>);
    };

    const validateFormData = (data: T) => {
        const result = schema.safeParse(data);
        if (!result.success) {
            const errors = processZodErrors(result.error);
            setFormErrors(normalizeErrors(errors));
            return false;
        }
        return true;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: T = { ...formData };

        if (validateFormData(data)) {
            setFormData(initialState);
            return data;
        }
    };

    return {
        formData,
        formErrors,
        handleChange,
        handleChangeSelect,
        handleBlur,
        handleSubmit,
    };
}
