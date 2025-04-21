import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { ClientesService } from "../../../core/services/clientes.service";

@Component ({
    selector: 'app-pages-cliente-cadastro',
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
        ReactiveFormsModule
    ]
})
export class PagesClienteCadastroComponent implements OnInit {
    
    public isEdicao = false;

    public form = new FormGroup({
        nome: new FormControl(''),
        tipoCliente: new FormControl(null)
    })

    constructor(
        private _activatedRoute: ActivatedRoute,
        private service: ClientesService,
    ) { }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.service.getCliente(id)
            .subscribe(cliente => {
                console.log(cliente);

                this.form.patchValue({
                    nome: cliente.Nome,
                    tipoCliente: cliente.Tipo_Cliente
                })
            })
        } else {
            this.isEdicao = false;
        }

    }

    salvar() {
        const dadosDoFormulario = this.form.value;
        console.log(dadosDoFormulario)

        if (this.isEdicao) {
            console.log('CHAMAR UPDATE')
        } else {
            console.log('CHAMAR INSERT')
        }
    }
}