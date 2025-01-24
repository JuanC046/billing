export interface CustomerInterface {
    identification_document_id: string; // Tipo de documento de identificación
    identification: string;
    dv?: string; // Digito de verificación requerido con nit
    company?: string; // Nombre de la empresa - Razon social
    trade_name?: string; // Nombre comercial
    names?: string; // Nombres persona natural
    address?: string; // Dirección
    email?: string; // Correo electronico
    phone?: string; // Telefono
    legal_organization_id: string; // Tipo de organización legal
    tribute_id: string; // Tipo de tributo
    municipality_id?: string; // Municipio
}