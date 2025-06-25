import { Component, OnInit } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CadastroMovimenModel } from "../../../../core/models/private/Movimen/cadastroMovimen.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MovimenService } from "../../../../core/services/movimen.service";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { EditarMovimenModel } from "../../../../core/models/private/Movimen/editarMovimen.model";
import { ListagemRotaModel } from "../../../../core/models/private/rota/listagemRota.model";
import { DATE_CONFIG_PROVIDERS } from '../../../../core/date-format.config';
import { RotaService } from "../../../../core/services/rota.service";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
    selector: 'app-pages-estoque',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter(), DatePipe, ...DATE_CONFIG_PROVIDERS],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        NgForOf,
        ReactiveFormsModule,
        NgIf
    ],
})
export class PagesEstoqueMovimentacaoCadastroComponent implements OnInit {

    readonly startDate = new Date(1990, 0, 1);

    public isEdicao = false;

    public idSelecionado = null;

    public allRotas: ListagemRotaModel[] = [];

    dataMinimaMovimento = new Date();

    public form = new FormGroup({
        idRota: new FormControl('', Validators.required),
        categoria: new FormControl(null, Validators.required),
        quantidade: new FormControl('', Validators.required),
        dataEntrada: new FormControl('', Validators.required)
    });

    constructor(
        private rotaService: RotaService,
        private router: Router,
        private datePipe: DatePipe,
        private _activatedRoute: ActivatedRoute,
        private service: MovimenService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        const hoje = new Date();
        this.dataMinimaMovimento = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

        this.rotaService.getRotas()
            .subscribe((rotas) => {
                this.allRotas = rotas;
            });

        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id;
            this.service.getMovimenById(id)
                .subscribe(movimentacao => {
                    this.form.patchValue({
                        idRota: movimentacao.ID_Rota,
                        quantidade: movimentacao.Quantidade,
                        dataEntrada: movimentacao.Data_Entrada,
                        categoria: movimentacao.Categoria
                    });
                });
        } else {
            this.isEdicao = false;
        }
    }

    salvar() {
        const entradaItem = new Date(this.form.value.dataEntrada);

        if (entradaItem > this.dataMinimaMovimento) {
            this.snackbar.open('O movimento tem que ser uma data anterior a hoje.', 'Ok', { duration: 5000 });
            return;
        }

        const dataValidadeFormatada = this.datePipe.transform(this.form.value.dataEntrada, 'yyyy-MM-dd') ?? '';

        const dadosDoFormulario: CadastroMovimenModel = {
            Quantidade: this.form.value.quantidade ?? '',
            Data_Entrada: dataValidadeFormatada,
            ID_Rota: this.form.value.idRota ?? '',
            Categoria: this.form.value.categoria ?? ''
        };

        if (this.isEdicao && this.idSelecionado) {
            const dadosEditaveis: EditarMovimenModel = {
                ID_Movimen: this.idSelecionado,
                Quantidade: this.form.value.quantidade ?? '',
                Data_Entrada: dataValidadeFormatada,
                ID_Rota: this.form.value.idRota ?? '',
                Categoria: this.form.value.categoria ?? ''
            };

            this.service.editarMovimen(this.idSelecionado, dadosEditaveis)
                .subscribe(() => {
                    this.snackbar.open('Movimentação editada com sucesso', 'Ok', { duration: 5000 });
                    this.router.navigate(['..'], {
                        relativeTo: this._activatedRoute
                    });
                });

        } else {
            this.service.criarNovaMovimen(dadosDoFormulario)
                .subscribe(() => {
                    this.snackbar.open('Movimentação criada com sucesso', 'Ok', { duration: 5000 });
                    this.router.navigate(['..'], {
                        relativeTo: this._activatedRoute
                    });
                });
        }
    }
}
