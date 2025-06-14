import { Component, OnInit, ViewChild } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { ClientesService } from "../../../core/services/clientes.service";
import { DadosClientesModel, TipoClienteEnum } from "../../../core/models/private/clientes/listaClientes.model";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";


type listaClientes = {
    id: number;
    nome: string;
    dataCadastro: string;
    tipoCliente: string;
}

@Component ({
    selector: 'app-pages-cliente-listagem',
    templateUrl: './listagem.component.html',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatSelectModule, 
        MatCheckboxModule, 
        MatRadioModule, 
        NgForOf,
        MatButtonModule,
        MatMenuModule,
        RouterLink,
        DatePipe
    ]
})
export class PagesClientesListagemComponent implements OnInit{
    
    DadosListaClientes:DadosClientesModel[] = []

    clienteSelecionado?: DadosClientesModel;

    TipoClienteEnum = TipoClienteEnum;

    constructor(
        private _service: ClientesService,
        private snackbar: MatSnackBar
    ){ }

    ngOnInit(): void {
        this._service.getClientes()
        .subscribe((listaClientes) => {

            this.DadosListaClientes = listaClientes
        })
    }

    baixarRelatorio() {
        this._service.getRelatorioClientes()
        .subscribe((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            const hoje = new Date()
            const dia = hoje.getDate().toString().padStart(2,'0')
            const mes = (hoje.getMonth()+1).toString().padStart(2,'0')
            const ano = hoje.getFullYear().toString().padStart(2,'0')
            const dataRelatorio = `${dia}-${mes}-${ano}`
            a.download = `relatorio_clientes_${dataRelatorio}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
            setTimeout(() => {
                this.snackbar.open('Relatório gerado com sucesso', 'Ok')

            }, 1000)
        });
    }

}