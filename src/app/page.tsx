"use client";
import { auth } from "@/services/auth";
import { getProducts } from "@/services/products";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import FormCustomer from "@/components/Forms/FormCustomer";
import FormBill from "@/components/Forms/FormBill";
import AddProducts from "@/components/AddProducts";
import { Button } from "@mui/material";
import AlertDialog from "@/components/Dialog";

import { ProductInterface } from "@/interfaces/product";
import { CustomerInterface } from "@/interfaces/customer";
import { BaseBillInterface, BillInterface } from "@/interfaces/bill";
import { customerSchema } from "@/schemas/customer";
import { baseBillSchema } from "@/schemas/bill";

import useForm from "@/hooks/useForm";

import qs from "qs";

const initialFormDataBill: BaseBillInterface = {
    numbering_range_id: 8,
    document: "01",
    reference_code: "fact" + Math.floor(Math.random() * 1000).toString(),
    observation: "",
    payment_method_code: "10",
};
const initialFormErrorsBill: Record<string, string> = {
    numbering_range_id: "",
    document: "",
    reference_code: "",
    observation: "",
    payment_method_code: "",
};
const initialFormDataCustomer: CustomerInterface = {
    identification_document_id: "3",
    identification: "",
    dv: "",
    company: "",
    trade_name: "",
    names: "",
    address: "",
    email: "",
    phone: "",
    legal_organization_id: "1",
    tribute_id: "18",
    // municipality_id: 0,
};
const initialFormErrorsCustomer: Record<string, string> = {
    identification_document_id: "",
    identification: "",
    dv: "",
    company: "",
    trade_name: "",
    names: "",
    address: "",
    email: "",
    phone: "",
    legal_organization_id: "",
    tribute_id: "",
    municipality_id: "",
};
export default function Home() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [shoppingCart, setShoppingCart] = useState<ProductInterface[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [billqr, setBillqr] = useState("");
    useEffect(() => {
        const getTokens = async () => {
            try {
                const data = await auth();
                console.log(data);
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
            } catch (error) {
                console.error(error);
            }
        };
        getTokens();
        const fetchProducts = async () => {
            const data = await getProducts();
            console.log("Productos\n", data);
            setProducts(data);
        };
        fetchProducts();
    }, []);
    const numberElementsBill: string[] = ["numbering_range_id"];
    const {
        formData: formDataBill,
        formErrors: formErrorsBill,
        handleChange: handleChangeBill,
        handleBlur: handleBlurBill,
        handleChangeSelect: handleChangeSelectBill,
        handleValidation: handleValidationBill,
    } = useForm<BaseBillInterface>(
        initialFormDataBill,
        numberElementsBill,
        baseBillSchema,
        initialFormErrorsBill
    );
    const numberElementsCustomer: string[] = [];
    const {
        formData: formDataCustomer,
        formErrors: formErrorsCustomer,
        handleChange: handleChangeCustomer,
        handleBlur: handleBlurCustomer,
        handleChangeSelect: handleChangeSelectCustomer,
        handleValidation: handleValidationCustomer,
    } = useForm<CustomerInterface>(
        initialFormDataCustomer,
        numberElementsCustomer,
        customerSchema,
        initialFormErrorsCustomer
    );
    const handleSubmit = async () => {
        const dataBill = handleValidationBill();
        const dataCustomer = handleValidationCustomer();
        if (!dataBill || !dataCustomer) {
            alert("Hay campos sin llenar");
            return;
        }
        if (!shoppingCart.length) {
            alert("No hay productos agregados");
            return;
        }
        try {
            console.log("Sending data to the server...");
            console.log(dataBill);
            console.log(dataCustomer);
            const data: BillInterface = {
                ...dataBill,
                customer: dataCustomer,
                items: shoppingCart.map(({ id, ...item }) => item),
            };
            console.log(
                "Final data (user input):",
                JSON.stringify(data, null, 2)
            );
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/v1/bills/validate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                        Accept: "application/json",
                    },
                    body: qs.stringify(data),
                }
            );
            const responseData = await response.json();
            console.log("Response\n", responseData);
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log("Success:", responseData);
            setBillqr(responseData.data.bill.qr);
            setDialogOpen(true);
                // setShoppingCart([]);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <main>
            <h2>Creación de factura</h2>
            <section className={styles.section}>
                <h3>Información de la factura</h3>
                <FormBill
                    formData={formDataBill}
                    formErrors={formErrorsBill}
                    handleChange={handleChangeBill}
                    handleBlur={handleBlurBill}
                    handleChangeSelect={handleChangeSelectBill}
                />
            </section>
            <hr />
            <section className={styles.section}>
                <h3>Información del cliente</h3>
                <FormCustomer
                    formData={formDataCustomer}
                    formErrors={formErrorsCustomer}
                    handleChange={handleChangeCustomer}
                    handleBlur={handleBlurCustomer}
                    handleChangeSelect={handleChangeSelectCustomer}
                />
            </section>
            <section className={styles.section}>
                <h3>Productos</h3>
                <AddProducts
                    products={products}
                    shoppingCart={shoppingCart}
                    setShoppingCart={setShoppingCart}
                />
            </section>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={styles.button}
            >
                Crear factura
            </Button>
            <AlertDialog
                open={dialogOpen}
                handleClose={setDialogOpen}
                title="Factura creada con exito"
                subtitle="Acceda a su factura"
                link={billqr}
            />
        </main>
    );
}
