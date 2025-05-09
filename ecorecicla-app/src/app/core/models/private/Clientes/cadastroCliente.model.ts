import { TipoClienteEnum } from "./listaClientes.model";

export interface CadastroClienteModel {
    Nome: string;
    Telefone: string;
    CPF?: string;
    CNPJ?: string;
    Pontos_Coleta: string;
    Tipo_Cliente: TipoClienteEnum;
}