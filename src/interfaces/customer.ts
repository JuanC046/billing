export interface CustomerInterface {
    identification_document_id: string;
    identification: string;
    dv?: string; // Digito de verificación requerido con nit
    company?: string; // Nombre de la empresa - Razon social
    trade_name?: string; // Nombre comercial
    names?: string; // Nombres persona natural
    address?: string; // Dirección
    email?: string; // Correo electronico
    phone?: string; // Telefono
    legal_organization_id: number; // Tipo de organización legal
    tribute_id: number; // Tipo de tributo
    municipality_id?: number; // Municipio
}