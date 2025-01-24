export async function  getProducts() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/products`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}
