export interface EditarMovimenModel {
  ID_Movimen: number; 
  ID_Coleta: number;
  Quantidade: number;
  Data_Entrada: string; 
  Categoria: 'plastico' | 'papel' | 'metal' | 'organico' | 'vidro';
  AvisarEstoqueMax: 'S' | 'N';
  AvisarEstoqueMin: 'S' | 'N';
}
