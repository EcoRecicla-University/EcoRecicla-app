import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { CadastroMovimenModel } from "../../../../core/models/private/Movimen/cadastroMovimen.model";
import { ChaveColetaModel } from "../../../../core/models/private/Movimen/BuscaChaves/chaveColeta.model";
import { MovimenService } from "../../../../core/services/movimen.service";
import { CommonModule } from '@angular/common'; // ADICIONE no topo

@Component({
  selector: 'app-pages-estoque',
  templateUrl: './cadastro.component.html',
  standalone: true,
  imports: [
  CommonModule, // ESSENCIAL para ngFor funcionar
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule,
  ReactiveFormsModule
]

})
export class PagesEstoqueMovimentacaoCadastroComponent implements OnInit {
  public form!: FormGroup;
  public isEdicao = false;
  public idSelecionado: number | null = null;
  public chavesColeta: ChaveColetaModel[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private service: MovimenService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
      this.form = this.fb.group({
        ID_Coleta_Tipo_Residuo: [null, Validators.required],
        Quantidade: [null, [Validators.required, Validators.min(0.01)]],
        Data_Entrada: [null, Validators.required],
        AvisarEstoqueMax: ['N'],
        AvisarEstoqueMin: ['N']
    });

    this.service.getChaveColeta().subscribe({
      next: (res) => this.chavesColeta = res,
      error: (err) => console.error('Erro ao carregar chaves de coleta:', err)
    });
  }

  salvar(): void {
      const dadosDoFormulario: CadastroMovimenModel = {
        ID_Coleta_Tipo_Residuo: this.form.value.ID_Coleta_Tipo_Residuo,
        Quantidade: this.form.value.Quantidade,
        Data_Entrada: this.form.value.Data_Entrada,
        AvisarEstoqueMax: this.form.value.AvisarEstoqueMax,
        AvisarEstoqueMin: this.form.value.AvisarEstoqueMin
    };


    console.log('Enviando para API:', dadosDoFormulario); // ← aqui

    if (this.isEdicao && this.idSelecionado) {
      // implementação futura de edição
    } else {
      this.service.criarNovaMovimen(dadosDoFormulario)
        .subscribe(() => {
          this.snackbar.open('Movimentação criada com sucesso', 'Ok');
          this.router.navigate(['..'], {
            relativeTo: this._activatedRoute
          });
        });
    } 
  }
}
