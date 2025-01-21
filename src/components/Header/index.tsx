"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styles from "./Header.module.css";


export default function Header() {
    const [value, setValue] = useState<string>("");
    const router = useRouter();
    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(`/${newValue}`);
    };

    return (
        <header className={styles.header}>
            <Image src={"/payment.png"} alt="Bill" width={50} height={50} />
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="Navigation tabs"
            >
                <Tab value="" label="Factura" />
                <Tab value="product" label="Producto" />
                <Tab value="customer" label="Cliente" />
            </Tabs>
        </header>
    );
}
