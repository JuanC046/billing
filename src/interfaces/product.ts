export interface WithholdingtaxInterface {
    code: number;
    withholding_tax_rate: number;
}
export interface ProductInterface {
    code_reference: string;
    name: string;
    price: number;
    tax_rate: string;
    unit_measure_id: number;
    standard_code_id: number;
    is_excluded: number;
    tribute_id: number;
    withholding_taxes?: WithholdingtaxInterface[];
}