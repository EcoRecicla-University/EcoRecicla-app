export interface CadastroMovimenModel {
  ID_Coleta: number;
  Quantidade: number;
  Data_Entrada: string;
  Categoria: 'plastico' | 'metal' | 'organico' | 'papel' | 'vidro';
  AvisarEstoqueMax: 'S' | 'N';
  AvisarEstoqueMin: 'S' | 'N';
}
