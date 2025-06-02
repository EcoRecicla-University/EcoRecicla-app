export interface DadosMovimenModel {
  ID_Movimen: number;
  ID_Coleta_Tipo_Residuo: number;
  Quantidade: number;
  Data_Entrada: string;
  Tipo_Residuo: string; // esta vindo do JOIN com Tipo_Residuo
}

