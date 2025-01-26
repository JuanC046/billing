import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styles from "./AddProducts.module.css";
import Typography from "@mui/material/Typography";

import { ProductInterface } from "@/interfaces/product";

interface AddProductsProps {
    products: ProductInterface[];
    setShoppingCart: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
    shoppingCart: ProductInterface[];
}
export default function AddProducts({
    products,
    setShoppingCart,
    shoppingCart,
}: AddProductsProps) {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddProduct = () => {
        if (!product) return;

        const newProduct = {
            ...product,
            quantity: quantity,
        };

        setShoppingCart([...shoppingCart, newProduct]);
        setProduct(null);
        setQuantity(1);
    };

    return (
        <>
            <div className={styles["add_product"]}>
                <TextField
                    className={styles["select_product"]}
                    id="outlined-select-currency"
                    select
                    label="Producto"
                    value={product?.code_reference || "0"}
                    fullWidth
                    onChange={(event) => {
                        const selectedProduct = products.find(
                            (product) =>
                                product.code_reference === event.target.value
                        );
                        setProduct(selectedProduct || null);
                    }}
                >
                    {products.length && (
                        <MenuItem value="0" disabled>
                            Seleccione un producto
                        </MenuItem>
                    )}
                    {products.length ? (
                        products.map((product) => (
                            <MenuItem
                                key={product.code_reference}
                                value={product.code_reference}
                            >
                                {product.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem value="0" disabled>
                            No hay productos
                        </MenuItem>
                    )}
                </TextField>
                <TextField
                    label="Cantidad"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className={styles["product_quantity"]}
                />
                <Button
                    className={styles["button-add"]}
                    variant="outlined"
                    color="primary"
                    onClick={handleAddProduct}
                    disabled={Boolean(!product)}
                >
                    Agregar producto
                </Button>
            </div>
            <List className={styles["list_products"]}>
                {shoppingCart.map((product) => (
                    <ListItem
                        className={styles["product"]}
                        key={product.code_reference}
                    >
                        <ListItemText
                            className={styles["product_name"]}
                            primary={product.name}
                            secondary={`Cantidad: ${product.quantity}`}
                        />
                        <ListItemText
                            className={styles["product_price"]}
                            primary={`${product.price}`}
                        />
                        <ListItemText
                            className={styles["product_total"]}
                            primary={`${
                                product.price * (product.quantity || 1)
                            }`}
                        />
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" gutterBottom>
                Total: $
                {shoppingCart.reduce(
                    (acc, product) =>
                        acc + product.price * (product.quantity || 1),
                    0
                )}
            </Typography>
        </>
    );
}
