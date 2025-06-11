import { Component, OnInit } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CadastroMovimenModel } from "../../../../core/models/private/Movimen/cadastroMovimen.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MovimenService } from "../../../../core/services/movimen.service";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { ColetaService } from "../../../../core/services/coleta.service";
import { EditarColetaModel } from "../../../../core/models/private/coleta/editarColeta.model";
import { ListagemColetaModel } from "../../../../core/models/private/coleta/listaColeta.model";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { AvisosEnum, EditarMovimenModel } from "../../../../core/models/private/Movimen/editarMovimen.model";

@Component ({
    selector: 'app-pages-estoque',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter(), DatePipe],
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
        MatCheckboxModule,
        NgIf
    ],
})
export class PagesEstoqueMovimentacaoCadastroComponent implements OnInit{
    
    readonly startDate = new Date(1990, 0, 1);

    public isEdicao = false;

    public idSelecionado = null;

    public allColetas: ListagemColetaModel[] = [];

    public form = new FormGroup({
        idColeta: new FormControl('', Validators.required),
        categoria: new FormControl(null, Validators.required),
        quantidade: new FormControl('', Validators.required),
        dataEntrada: new FormControl('', Validators.required),
        avisarEstoqueMax: new FormControl(false, Validators.required),
        avisarEstoqueMin: new FormControl(false, Validators.required)
    })

    constructor(
        private coletaService: ColetaService,
        private router: Router,
        private datePipe: DatePipe,
        private _activatedRoute: ActivatedRoute,
        private service: MovimenService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.coletaService.getColetas()
        .subscribe((coletas) => {
            this.allColetas = coletas
        })

        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id
            this.service.getMovimenById(id)
            .subscribe(movimentacao => {
                const avisarMax = movimentacao.AvisarEstoqueMax == AvisosEnum.Sim;
                const avisarMin = movimentacao.AvisarEstoqueMin == AvisosEnum.Sim;
                this.form.patchValue({
                    idColeta: movimentacao.ID_Coleta,
                    quantidade: movimentacao.Quantidade,
                    dataEntrada: movimentacao.Data_Entrada,
                    categoria: movimentacao.Categoria,
                    avisarEstoqueMax: avisarMax,
                    avisarEstoqueMin: avisarMin
                })
            })
        } else {
            this.isEdicao = false;
        }
    }

    salvar() {

        const dataValidadeFormatada = this.datePipe.transform(this.form.value.dataEntrada, 'yyyy-MM-dd') ?? '';

        const dadosDoFormulario: CadastroMovimenModel = {
            Quantidade: this.form.value.quantidade ?? '',
            Data_Entrada: dataValidadeFormatada,
            ID_Coleta: this.form.value.idColeta ?? '',
            Categoria: this.form.value.categoria ?? '',
            AvisarEstoqueMax: this.form.value.avisarEstoqueMax ? AvisosEnum.Sim : AvisosEnum.Nao,
            AvisarEstoqueMin: this.form.value.avisarEstoqueMin ? AvisosEnum.Sim : AvisosEnum.Nao
        }

        if (this.isEdicao && this.idSelecionado) {
            const dadosEditaveis: EditarMovimenModel = {
                ID_Movimen: this.idSelecionado,
                Quantidade: this.form.value.quantidade ?? '',
                Data_Entrada: dataValidadeFormatada,
                ID_Coleta: this.form.value.idColeta ?? '',
                Categoria: this.form.value.categoria ?? '',
                AvisarEstoqueMax: this.form.value.avisarEstoqueMax ? AvisosEnum.Sim : AvisosEnum.Nao,
                AvisarEstoqueMin: this.form.value.avisarEstoqueMin ? AvisosEnum.Sim : AvisosEnum.Nao
            };
        
            this.service.editarMovimen(this.idSelecionado, dadosEditaveis)
            .subscribe(() => {
                this.snackbar.open('Movimentação editada com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            });

        } else {
            this.service.criarNovaMovimen(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Movimentação criado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            })
        }
    }
}