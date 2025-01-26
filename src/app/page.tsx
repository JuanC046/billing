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
import Progress from "@/components/Progress";

import { ProductInterface } from "@/interfaces/product";
import { CustomerInterface } from "@/interfaces/customer";
import { BaseBillInterface, BillInterface } from "@/interfaces/bill";
import { customerSchema } from "@/schemas/customer";
import { baseBillSchema } from "@/schemas/bill";

import useForm from "@/hooks/useForm";

import { validateBill } from "@/services/bills";

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
    const [dialogMessage, setDialogMessage] = useState({
        title: "",
        subtitle: "",
        link: "",
    });
    const [loading, setLoading] = useState(false);
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
            try {
                const data = await getProducts();
                console.log("Productos\n", data);
                setProducts(data);
            } catch (error) {
                console.error(error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Ha ocurrido un error inesperado";
                setDialogMessage({
                    title: "Ha ocurrido un error",
                    subtitle: errorMessage,
                    link: "",
                });
                setDialogOpen(true);
            }
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
        handleClear: handleClearBill,
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
        handleClear: handleClearCustomer,
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
            setDialogMessage({
                title: "Ha ocurrido un error",
                subtitle: "Revise los campos del formulario",
                link: "",
            });
            setDialogOpen(true);
            return;
        }
        if (
            dataCustomer.identification_document_id !== "6" &&
            !dataCustomer.names
        ) {
            setDialogMessage({
                title: "Ha ocurrido un error",
                subtitle: "El campo de nombres es requerido",
                link: "",
            });
            setDialogOpen(true);
            document.getElementsByName("names")[0]?.focus();
            return;
        }
        if (
            dataCustomer.identification_document_id === "6" &&
            !dataCustomer.company
        ) {
            setDialogMessage({
                title: "Ha ocurrido un error",
                subtitle: "El campo de empresa es requerido",
                link: "",
            });
            setDialogOpen(true);
            document.getElementsByName("company")[0]?.focus();
            return;
        }
        if (!shoppingCart.length) {
            setDialogMessage({
                title: "Ha ocurrido un error",
                subtitle: "Agregue productos al carrito",
                link: "",
            });
            setDialogOpen(true);
            return;
        }
        console.log("Sending data to the server...");
        console.log(dataBill);
        console.log(dataCustomer);
        setLoading(true);
        const response = await validateBill({
            ...dataBill,
            customer: dataCustomer,
            items: shoppingCart.map(({ id, ...item }) => item),
        } as BillInterface);
        setLoading(false);
        console.log("Response\n", response);
        if (response.status !== "Created") {
            setDialogMessage({
                title: "Ha ocurrido un error",
                subtitle: response.message,
                link: "",
            });
            setDialogOpen(true);
            return;
        }
        setDialogMessage({
            title: "Factura creada con exito",
            subtitle: "Acceda a su factura",
            link: response.data.bill.qr,
        });
        setDialogOpen(true);
        setShoppingCart([]);
        handleClearBill();
        handleClearCustomer();
    };
    return (
        <main aria-hidden="false">
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
                size="large"
            >
                Crear factura
            </Button>
            <AlertDialog
                open={dialogOpen}
                handleClose={setDialogOpen}
                title={dialogMessage.title}
                subtitle={dialogMessage.subtitle}
                link={dialogMessage.link}
            />
            <Progress open={loading} title="Creando factura..." />
        </main>
    );
}
