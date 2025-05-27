import { TipoClienteEnum } from "./listaClientes.model";

export interface EditarClienteModel {
    Id: string;
    Nome: string;
    Telefone: string;
    CPF?: string;
    CNPJ?: string;
    Pontos_Coleta: string;
    Tipo_Cliente: TipoClienteEnum;
}