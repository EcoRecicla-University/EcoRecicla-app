export interface DadosMovimenModel {
  ID_Movimen: number;
  ID_Coleta: number;
  Quantidade: number;
  Data_Entrada: Date;
  Categoria: 'plastico' | 'metal' | 'organico' | 'papel' | 'vidro';
  AvisarEstoqueMax: 'S' | 'N';
  AvisarEstoqueMin: 'S' | 'N';
}