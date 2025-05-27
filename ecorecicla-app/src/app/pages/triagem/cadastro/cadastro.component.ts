import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { EnderecoService } from "../../../core/services/endereco.service";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component ({
    selector: 'app-pages-veiculos',
    templateUrl: './cadastro.component.html',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        ReactiveFormsModule,
        NgIf,
        MatProgressBarModule
    ]
})

    
export class PagesTriagemCadastroComponent implements OnInit {

    public isEdicao = false;

    public idSelecionado = null;

    public isLoadingCep = false;

    public form = new FormGroup({
        nomeCentro: new FormControl('', Validators.required),
        capacidade: new FormControl('', Validators.required),
        endereco: new FormGroup({
            cep: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
            logradouro: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            localidade: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            estado: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            bairro: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            numero: new FormControl('', [Validators.required, Validators.maxLength(200)])
        })
    })

    constructor(
        private enderecoService: EnderecoService
    ) {}

    ngOnInit(): void {
        this._desabilitarFormularioEndereco()
    }

    salvar() {

    }

    buscarEnderecoPorCep() {
        const cep = this.form.get('endereco').get('cep').value
        
        this.form.get('endereco').get('cep').disable()
        this.isLoadingCep = true
        this.enderecoService.getEnderecoPorCep(cep)
        .subscribe((endereco) => {
            this.isLoadingCep = false
            this.form.get('endereco').get('cep').enable()
            
            this.form.get('endereco').patchValue({
                cep,
                logradouro: endereco.logradouro,
                localidade: endereco.localidade,
                estado: endereco.estado,
                bairro: endereco.bairro,
                numero: endereco.unidade
            })

        })
    }

    private _desabilitarFormularioEndereco(){
        this.form.get('endereco').get('logradouro').disable();
        this.form.get('endereco').get('localidade').disable();
        this.form.get('endereco').get('estado').disable();
        this.form.get('endereco').get('bairro').disable();
    }
}