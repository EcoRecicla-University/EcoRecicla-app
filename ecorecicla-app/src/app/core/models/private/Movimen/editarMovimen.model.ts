import { CategoriaEnum } from "./cadastroMovimen.model";

export enum AvisosEnum{
    Sim = 'S',
    Nao = 'N',
}

export const AvisosEnumLabel = {
    [AvisosEnum.Sim]: 'Sim',
    [AvisosEnum.Nao]: 'Não',
}
export interface EditarMovimenModel {
    ID_Movimen: string;
    Quantidade: string;
    Data_Entrada: string;
    ID_Rota: string;
    Categoria: CategoriaEnum;
    AvisarEstoqueMax: AvisosEnum;
    AvisarEstoqueMin: AvisosEnum;  
    Nome?: string;
}