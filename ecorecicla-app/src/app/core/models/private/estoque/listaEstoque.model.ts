export interface ListagemEstoqueModel {
  Categoria: 'plastico' | 'metal' | 'organico' | 'papel' | 'vidro';
  Qtd_Total: number;
  Ult_Data_Entrada: Date;
}
