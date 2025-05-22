import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { CadastroColetaModel } from "../../../core/models/private/coleta/coleta.model";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component ({
    selector: 'app-pages-coleta-cadastro',
    templateUrl: './cadastro.component.html',
    imports: [
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
    providers: [provideNativeDateAdapter()],
})

export class PagesColetaCadastroComponent implements OnInit{

    readonly startDate = new Date(1990, 0, 1);

    public isEdicao = false;
    public idSelecionado = null;

    public form = new FormGroup({
        clienteId: new FormControl('', [Validators.required]),
        dataColeta: new FormControl('', [Validators.required]),
        quantidade: new FormControl('', [Validators.required]),
        statusColeta: new FormControl('', [Validators.required]),
        idRota: new FormControl('', Validators.required),
        endCliente: new FormControl({value: '', disabled: true})
    });

    constructor(

    ) {}

    ngOnInit(): void {
        
    }

    salvar() {
        const dadosDoFormulario: CadastroColetaModel = {
            Cliente_ID: this.form.value.clienteId ?? '',
            Data_Coleta: this.form.value.dataColeta ?? '',
            Quantidade: this.form.value.quantidade ?? '',
            Status_Coleta: this.form.value.statusColeta ?? '',
            Rota_ID: this.form.value.idRota ?? ''
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
            // this.service.criarNovoCliente(dadosDoFormulario)
            // .subscribe(() => {
            //     this.snackbar.open('Cliente criado com sucesso', 'Ok')
            //     this.router.navigate(['..'], {
            //         relativeTo: this._activatedRoute
            //     })
            // },
            //     (error) => {
            //         this.snackbar.open(error.error.error, 'Ok')
            //     })
        }
    }
}