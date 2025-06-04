export enum StatusColetaEnum {
    AB = 'Aberta',
    EA = 'Em Andamento',
    CO = 'Concluída',
    CA = 'Cancelada',
}

export interface ListagemColetaModel {
    Nome: string;
    Nome_Cliente?: string;
    ID_Coleta: string;
    Data_Coleta: string;
    ID_Cliente: string;
    Quantidade: string;
    Status_Coleta: StatusColetaEnum;
}