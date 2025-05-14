import { Component, OnInit } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CadastroMovimenModel } from "../../../../core/models/private/Movimen/cadastroMovimen.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MovimenService } from "../../../../core/services/movimen.service";

@Component ({
    selector: 'app-pages-estoque',
    templateUrl: './cadastro.component.html',
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule],
})
export class PagesEstoqueMovimentacaoCadastroComponent implements OnInit{
    
    public isEdicao = false;

    public idSelecionado = null;

    public idsColeta = null;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private service: MovimenService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        // this.service.getChaveColeta()
        // .subscribe((coletas) => {
        //     coletas = this.idsColeta
        //     console.log(this.idsColeta)
        // })
    }

    public form = new FormGroup({
            quantidade: new FormControl('', Validators.required),
            dataEntrada: new FormControl(null as Date, Validators.required),
        })

        salvar() {
            const dadosDoFormulario: CadastroMovimenModel = {
                Quantidade: this.form.value.quantidade ?? '',
                dataEntrada: this.form.value.dataEntrada ?? null,
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
                // this.service.criarNovaMovimen(dadosDoFormulario)
                // .subscribe(() => {
                //     this.snackbar.open('Movimentação criado com sucesso', 'Ok')
                //     this.router.navigate(['..'], {
                //         relativeTo: this._activatedRoute
                //     })
                // })
            }
        }
}