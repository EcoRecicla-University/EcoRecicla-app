import { CategoriaEnum } from "./cadastroMovimen.model";

export enum AvisosEnum{
    S = 'Sim',
    N = 'Não',
}
export interface EditarMovimenModel {
    ID_Movimen: string;
    Quantidade: string;
    Data_Entrada: string;
    Nome_Coleta: string;
    ID_Coleta: string;
    Categoria: CategoriaEnum;
    AvisarEstoqueMax: AvisosEnum;
    AvisarEstoqueMin: AvisosEnum;  
}