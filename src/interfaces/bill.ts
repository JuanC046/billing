import { CustomerInterface } from "./customer";
import { ProductInterface } from "./product";

export interface BaseBillInterface {
    numbering_range_id: number;
    document: string;
    reference_code: string;
    observation?: string;
    payment_method_code: string;
}
export interface BillInterface extends BaseBillInterface {
    customer: CustomerInterface;
    items: ProductInterface[];
}
