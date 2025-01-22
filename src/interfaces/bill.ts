import { CustomerInterface } from "./customer";
import { ProductInterface } from "./product";

export interface BillInterface {
    numbering_range_id: number;
    document?: string;
    reference_code: string;
    observation?: string;
    payment_method_code: string;
    customer: CustomerInterface;
    items: ProductInterface[];
}
