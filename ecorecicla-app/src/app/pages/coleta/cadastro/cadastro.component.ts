import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CadastroColetaModel } from "../../../core/models/private/coleta/cadastroColeta.model";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { ClientesService } from "../../../core/services/clientes.service";
import { ColetaService } from "../../../core/services/coleta.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DadosClientesModel } from "../../../core/models/private/clientes/listaClientes.model";

@Component ({
    selector: 'app-pages-coleta-cadastro',
    templateUrl: './cadastro.component.html',
    imports: [
        NgForOf,
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        RouterLink,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule
    ],
    providers: [provideNativeDateAdapter(), DatePipe],
})

export class PagesColetaCadastroComponent implements OnInit{

    readonly startDate = new Date(1990, 0, 1);

    allClientes: DadosClientesModel[] = []

    public isEdicao = false;
    public idSelecionado = null;

    public form = new FormGroup({
        clienteId: new FormControl('', [Validators.required]),
        dataColeta: new FormControl('', [Validators.required]),
        quantidade: new FormControl('', [Validators.required]),
        statusColeta: new FormControl('', [Validators.required]),
    });

    constructor(
        private clienteService: ClientesService,
        private service: ColetaService,
        private datePipe: DatePipe,
        private snackbar: MatSnackBar,
        private router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.clienteService.getClientes()
        .subscribe((clientes) => {
            this.allClientes = clientes
        })
    }

    salvar() {
        const dataValidadeFormatada = this.datePipe.transform(this.form.value.dataColeta, 'yyyy-MM-dd') ?? '';

        const dadosDoFormulario: CadastroColetaModel = {
            Cliente_ID: this.form.value.clienteId ?? '',
            Data_Coleta: dataValidadeFormatada,
            Quantidade: this.form.value.quantidade ?? '',
            Status_Coleta: this.form.value.statusColeta ?? '',
        }

        if (this.isEdicao && this.idSelecionado) {
            // const dadosEditaveis: EditarClienteModel = {
            //     Id: this.idSelecionado,
            //     Nome: this.form.value.nome ?? '',
            //     CPF: this.form.value.cpf || undefined,
            //     CNPJ: this.form.value.cnpj || undefined,
            //     Telefone: this.form.value.telefone ?? '',
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
            this.service.criarNovaColeta(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Coleta criada com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            },
                (error) => {
                    this.snackbar.open(error.error.error, 'Ok')
                })
        }
    }
}