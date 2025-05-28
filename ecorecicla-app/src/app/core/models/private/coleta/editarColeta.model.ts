import { StatusColetaEnum } from "./listaColeta.model";

export interface EditarColetaModel{
    Nome: string;
    ID_Coleta: string;
    Data_Coleta: string;
    ID_Cliente: string;
    Quantidade: string;
    Status_Coleta: StatusColetaEnum;
}