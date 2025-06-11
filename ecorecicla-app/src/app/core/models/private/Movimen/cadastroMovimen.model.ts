import { AvisosEnum } from "./editarMovimen.model";

export enum CategoriaEnum {
    PL = 'Plastico',
    ME = 'Metal',
    OR = 'Organico',
    PA = 'Papel',
    VI = 'Vidro'
}

export interface CadastroMovimenModel {
    Quantidade: string;
    Data_Entrada: string;
    ID_Rota: string;
    Categoria: CategoriaEnum;
    AvisarEstoqueMax: AvisosEnum;
    AvisarEstoqueMin: AvisosEnum; 
    Nome_Coleta?: string;
}