import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { VeiculosService } from "../../../core/services/veiculos.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CadastroVeiculosModel } from "../../../core/models/private/cadastroVeiculos.model";

@Component ({
    selector: 'app-pages-veiculos',
    templateUrl: './cadastro.component.html',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule,
        ReactiveFormsModule
    ]
})

    
export class PagesVeiculosCadastroComponent implements OnInit {

    public isEdicao = false;

    public idSelecionado = null

    public form = new FormGroup({
        placa: new FormControl('', Validators.required),
        modeloVeiculo: new FormControl('', Validators.required),
        quilometragem: new FormControl('', Validators.required),
        renavam: new FormControl('', Validators.required),
        capacidade: new FormControl('', Validators.required),
        // idMotorist: new FormControl('', Validators.required)
    })

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private service: VeiculosService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        // const id = this._activatedRoute.snapshot.params['id'];
        // if (id) {
        //     this.isEdicao = true;
        //     this.idSelecionado = id
        //     this.service.getCliente(id)
        //     .subscribe(cliente => {
        //         this.form.patchValue({
        //             nome: cliente.Nome,
        //             cpf: cliente.CPF,
        //             cnpj: cliente.CNPJ,
        //             telefone: cliente.Telefone,
        //             pontoDeColeta: cliente.Pontos_Coleta,
        //             tipoCliente: cliente.Tipo_Cliente
        //         })
        //     })
        // } else {
        //     this.isEdicao = false;
        // }

    }

    salvar() {
        const dadosDoFormulario: CadastroVeiculosModel = {
            Placa: this.form.value.placa ?? '',
            Modelo: this.form.value.modeloVeiculo || undefined,
            Quilometragem: this.form.value.quilometragem || undefined,
            Renavam: this.form.value.renavam ?? '',
            Capacidade_em_Kg: this.form.value.capacidade ?? '',
            // ID_Motorista: this.form.value.idMotorist ?? ''
        }

        if (this.isEdicao) {
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
            this.service.criarNovoVeiculo(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Veiculo criado com sucesso', 'Ok')
                // this.router.navigate(['..'], {
                //     relativeTo: this._activatedRoute
                // })
            })
        }
    }
}