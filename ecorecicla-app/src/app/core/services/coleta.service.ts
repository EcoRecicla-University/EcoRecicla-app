import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadastroColetaModel } from "../models/private/coleta/cadastroColeta.model";
import { Observable } from "rxjs";
import { ListagemColetaModel } from "../models/private/coleta/listaColeta.model";
import { EditarColetaModel } from "../models/private/coleta/editarColeta.model";

@Injectable({
    providedIn: 'root'
})
export class ColetaService{

    private apiUrl = 'http://localhost:8080/api/coleta';
    private apiRelatorioUrl = 'http://localhost:8080/api/relatorio/coleta';
    private apiDashboardUrl = 'http://localhost:8080/api/dashboard/coleta';

    constructor(
        private http: HttpClient
    ) { }

    private _formatarData(data: Date): string {
        // const yyyy = data.getFullYear();
        // const mm = String(data.getMonth() + 1).padStart(2, '0');
        // const dd = String(data.getDate()).padStart(2, '0');

        // return `${yyyy}-${mm}-${dd}`;

        return new Date(data).toISOString().slice(0, 19).replace('T', ' ');
    }

    getColetasHabilitadas(){
        const apiUrl = `${this.apiUrl}/habilitadas`;
        return this.http.get<ListagemColetaModel[]>(apiUrl, {})
    }

    getColetas(){
        return this.http.get<ListagemColetaModel[]>(this.apiUrl, {})
    }

    criarNovaColeta(dados: CadastroColetaModel): Observable<CadastroColetaModel>{
        const apiUrl = `${this.apiUrl}`;
        return this.http.post<CadastroColetaModel>(apiUrl, dados);
    }

    getColeta(id: string): Observable<EditarColetaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.get<EditarColetaModel>(apiUrl, {})
    }

    editarColeta(id: string, dados: EditarColetaModel): Observable<EditarColetaModel> {
        const apiUrl = `${this.apiUrl}/${id}`;
        return this.http.put<EditarColetaModel>(apiUrl, dados)
    }

    gerarRelatorioColetas(dataInicio: string, dataFim: string) {
        return this.http.post(`${this.apiRelatorioUrl}`, { dataInicio, dataFim }, { responseType: 'blob' });
    }

    getDashboardColetas(dataInicio: Date, dataFim: Date){
        const inicio = this._formatarData(dataInicio)
        const fim = this._formatarData(dataFim)

        return this.http.post<ListagemColetaModel[]>(this.apiDashboardUrl, { dataInicio: inicio, dataFim: fim });
    }
}