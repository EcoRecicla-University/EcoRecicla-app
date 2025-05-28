import { NgIf, DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ColetaService } from "../../../core/services/coleta.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EditarColetaModel } from "../../../core/models/private/coleta/editarColeta.model";
import { StatusColetaEnum } from "../../../core/models/private/coleta/listaColeta.model";

@Component({
    selector: 'app-pages-funcionarios-motoristas-detalhe',
    templateUrl: './detalhe.component.html',
    imports: [
        RouterLink,
        NgIf,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        DatePipe
    ]
})
export class PagesColetaDetalheComponent implements OnInit{
    
    idSelecionado = null

    StatusColetaEnum = StatusColetaEnum;

    coletaSelecionada: EditarColetaModel;
    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private service: ColetaService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.activeRoute.params
            .subscribe((params) => {
                const id = params['id'];
                this.idSelecionado = id;
                this.service.getColeta(id)
                    .subscribe((coleta) => {
                        this.coletaSelecionada = coleta;
                    })
            })
    }

    deletarFuncionario() {

    }
}