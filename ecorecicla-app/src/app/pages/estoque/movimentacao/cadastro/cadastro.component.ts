import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { CadastroMovimenModel } from "../../../../core/models/private/Movimen/cadastroMovimen.model";
import { MovimenService } from "../../../../core/services/movimen.service";
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

    @Component({
      selector: 'app-pages-estoque',
      templateUrl: './cadastro.component.html',
      standalone: true,
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,   
        MatNativeDateModule         
      ]
    })

export class PagesEstoqueMovimentacaoCadastroComponent implements OnInit {
  public form!: FormGroup;
  public isEdicao = false;
  public idSelecionado: number | null = null;
  public coletas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private service: MovimenService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ID_Coleta: [null, Validators.required],
      Quantidade: [null, [Validators.required, Validators.min(0.01)]],
      Data_Entrada: [null, [Validators.required, this.naoPermitirDataFutura]],
      AvisarEstoqueMax: ['N'],
      AvisarEstoqueMin: ['N'],
      Categoria: [null, Validators.required]
  });

    this.service.getColetas().subscribe({
      next: (res) => this.coletas = res,
      error: (err) => console.error('Erro ao carregar coletas:', err)
    });
  }

  naoPermitirDataFutura(control: AbstractControl): ValidationErrors | null {
    const hoje = new Date();
    const valor = new Date(control.value);
    return valor > hoje ? { dataFutura: true } : null;
  }

  salvar(): void {
    if (this.form.invalid) {
      this.snackbar.open('Corrija os erros antes de salvar.', 'Fechar', { duration: 3000 });
      return;
    }

    const dadosDoFormulario: CadastroMovimenModel = {
      ID_Coleta: this.form.value.ID_Coleta,
      Categoria: this.form.value.Categoria,
      Quantidade: Number(this.form.value.Quantidade),
      Data_Entrada: this.form.value.Data_Entrada,
      AvisarEstoqueMax: this.form.value.AvisarEstoqueMax,
      AvisarEstoqueMin: this.form.value.AvisarEstoqueMin
    };

    console.log('Enviando para API:', dadosDoFormulario);

    if (this.isEdicao && this.idSelecionado) {
      // implementação futura de edição
    } else {
      this.service.criarNovaMovimen(dadosDoFormulario).subscribe(() => {
        this.snackbar.open('Movimentação criada com sucesso', 'Ok');
        this.router.navigate(['..'], { relativeTo: this._activatedRoute });
      });
    }
  }
}
