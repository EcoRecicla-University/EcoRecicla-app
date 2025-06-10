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
        avisarEstoqueMax: new FormControl(null, Validators.required),
        avisarEstoqueMin: new FormControl(null, Validators.required)
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
    }

    salvar() {

        const dataValidadeFormatada = this.datePipe.transform(this.form.value.dataEntrada, 'yyyy-MM-dd') ?? '';

        const dadosDoFormulario: CadastroMovimenModel = {
            Quantidade: this.form.value.quantidade ?? '',
            Data_Entrada: dataValidadeFormatada,
            ID_Coleta: this.form.value.idColeta ?? '',
            Categoria: this.form.value.categoria ?? '',
            AvisarEstoqueMax: this.form.value.avisarEstoqueMax ?? '',
            AvisarEstoqueMin: this.form.value.avisarEstoqueMin ?? ''
        }

        if (this.isEdicao && this.idSelecionado) {
            // const dadosEditaveis: EditarClienteModel = {
            //     Id: this.idSelecionado,
            //     Nome: this.form.value.nome ?? '',
            //     CPF: this.form.value.cpf || undefined,
            //     CNPJ: this.form.value.cnpj || undefined,
            //     Telefone: this.form.value.telefone ?? '',
            //     Pontos_Coleta: this.form.value.pontoDeColeta ?? '',
            //     Tipo_Cliente: this.form.value.tipoCliente ?? ''
            // };
        
            // this.service.editarCliente(this.idSelecionado, dadosEditaveis)
            // .subscribe(() => {
            //     this.snackbar.open('Cliente editado com sucesso', 'Ok')
            //     this.router.navigate(['..'], {
            //         relativeTo: this._activatedRoute
            //     })
            // });

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