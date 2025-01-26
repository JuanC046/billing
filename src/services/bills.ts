import qs from "qs";
import { BillInterface } from "@/interfaces/bill";
export const validateBill = async (bill: BillInterface) => {
    try {
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
                body: qs.stringify(bill),
            }
        );
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
};
