export interface EditarTriagemModel {
    ID_Centro: string;
    Nome_Centro: string;
    Capaci_Armaze: string;
    Endereco: {
        CEP: string;
        Logradouro: string;
        Cidade: string;
        Estado: string;
        Bairro: string;
        Numero: string;
    }
}