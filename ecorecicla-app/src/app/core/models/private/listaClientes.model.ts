export interface DadosClientesModel {
    id: number;
    name: string;
    telefone: string;
    cpf?: string;
    cnpj?: string;
    pontosColeta: string;
    numeroPedidos: string;
    tipoCliente: string;
    dataCadastro: string;
}
