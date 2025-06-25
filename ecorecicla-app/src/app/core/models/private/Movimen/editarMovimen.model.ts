import { CategoriaEnum } from "./cadastroMovimen.model";

export interface EditarMovimenModel {
    ID_Movimen: string;
    Quantidade: string;
    Data_Entrada: string;
    ID_Rota: string;
    Categoria: CategoriaEnum;
    Nome?: string;
}
