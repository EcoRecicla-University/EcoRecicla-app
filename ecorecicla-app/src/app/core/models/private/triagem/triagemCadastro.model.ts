export interface CadastroTriagemModel {
    Nome_Centro: string;
    Capacidade_Armaze: string;
    Endereco: {
        CEP: string;
        Logradouro: string;
        Localidade: string;
        Estado: string;
        Bairro: string;
        Numero: string;
    }
}