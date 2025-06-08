import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { VeiculosService } from "../../../core/services/veiculos.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CadastroVeiculosModel } from "../../../core/models/private/veiculos/cadastroVeiculos.model";
import { NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { ListagemMotoristaModel } from "../../../core/models/private/funcionarios/motoristas/listaMotorista.model";
import { MotoristaService } from "../../../core/services/funcionarios/motorista.service";
import { EditarVeiculosModel } from "../../../core/models/private/veiculos/editarVeiculos.model";

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
        NgIf
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
        capacidade: new FormControl('', Validators.required)
    })

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private service: VeiculosService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];
        if (id) {
            this.isEdicao = true;
            this.idSelecionado = id
            this.service.getVeiculo(id)
            .subscribe(veiculo => {
                this.form.patchValue({
                    modeloVeiculo: veiculo.Modelo,
                    placa: veiculo.Placa,
                    renavam: veiculo.Renavam,
                    capacidade: veiculo.Capacidade_em_Kg,
                    quilometragem: veiculo.Quilometragem
                })
            })
        } else {
            this.isEdicao = false;
        }

    }

    salvar() {
        const dadosDoFormulario: CadastroVeiculosModel = {
            Placa: this.form.value.placa ?? '',
            Modelo: this.form.value.modeloVeiculo ?? '',
            Quilometragem: this.form.value.quilometragem ?? '',
            Renavam: this.form.value.renavam ?? '',
            Capacidade_em_Kg: this.form.value.capacidade ?? ''
        }

        if (this.isEdicao) {
            const dadosEditaveis: EditarVeiculosModel = {
                ID_Veiculo: this.idSelecionado,
                Modelo: this.form.value.modeloVeiculo ?? '',
                Placa: this.form.value.placa ?? '',
                Renavam: this.form.value.renavam ?? '',
                Quilometragem: this.form.value.quilometragem ?? '',
                Capacidade_em_Kg: this.form.value.capacidade ?? ''
            };
        
            this.service.editarVeiculo(this.idSelecionado, dadosEditaveis)
            .subscribe(() => {
                this.snackbar.open('Veiculo editado com sucesso', 'Ok')
                this.router.navigate(['..'], {
                    relativeTo: this._activatedRoute
                })
            });

        } else {
            this.service.criarNovoVeiculo(dadosDoFormulario)
            .subscribe(() => {
                this.snackbar.open('Veiculo criado com sucesso', 'Ok')
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