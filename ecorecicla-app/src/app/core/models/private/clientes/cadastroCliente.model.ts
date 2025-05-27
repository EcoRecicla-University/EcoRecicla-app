import { TipoClienteEnum } from "./listaClientes.model";

export interface CadastroClienteModel {
    Nome: string;
    Telefone: string;
    CPF?: string;
    CNPJ?: string;
    Tipo_Cliente: TipoClienteEnum;
    Endereco: {
        CEP: string;
        Logradouro: string;
        Localidade: string;
        Estado: string;
        Bairro: string;
        Numero: string;
    }
}