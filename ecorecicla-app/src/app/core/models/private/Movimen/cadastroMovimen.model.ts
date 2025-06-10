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
    ID_Coleta: string;
    Categoria: CategoriaEnum;
    AvisarEstoqueMax: boolean;
    AvisarEstoqueMin: boolean; 
}