export enum TipoClienteEnum {
    C = 'Coleta',
    V = 'Venda'
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
}
