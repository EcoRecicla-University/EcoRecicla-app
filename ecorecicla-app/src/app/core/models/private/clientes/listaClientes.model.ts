export enum TipoClienteEnum {
    C = 'Coleta',
    V = 'Venda',
    A = 'Ambos'
}

export interface DadosClientesModel {
    ID_Cliente: number;
    Nome: string;
    Telefone: string;
    CPF?: string;
    CNPJ?: string;
    Pontos_Coleta: string;
    Numero_Pedidos: string;
    Tipo_Cliente: TipoClienteEnum;
    Data_Cadastro: string;
    Endereco: {
        CEP: string;
        Logradouro: string;
        Cidade: string;
        Estado: string;
        Bairro: string;
        Numero: string;
    }
}
