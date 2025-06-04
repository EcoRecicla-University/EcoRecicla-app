import { NgIf, NgFor, DatePipe } from "@angular/common";
import { Component, OnInit, importProvidersFrom } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; 
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule, provideNativeDateAdapter } from "@angular/material/core";

import { MovimenService } from "../../../../core/services/movimen.service";
import { DadosMovimenModel } from "../../../../core/models/private/Movimen/listaMovimen.model";
import { EditarMovimenModel } from "../../../../core/models/private/Movimen/editarMovimen.model";

@Component({
  selector: 'app-pages-movimentacoes-detalhe',
  templateUrl: './detalhe.component.html',
  standalone: true,
  imports: [    
    RouterLink,
    NgIf,
    NgFor,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    DatePipe,
    ReactiveFormsModule
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class PagesMovimentacoesDetalheComponent implements OnInit {

  idSelecionado: number = null;
  movimenSelecionado: DadosMovimenModel;
  formEdicao!: FormGroup;
  modoEdicao: boolean = false;
  chavesColeta: any[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: MovimenService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const id = +params['id'];
      this.idSelecionado = id;  

      this.service.getMovimenById(id).subscribe({
        next: (movimen) => {
          this.movimenSelecionado = movimen;

          this.formEdicao = this.fb.group({
            ID_Coleta: [Number(movimen.ID_Coleta)],
            quantidade: [movimen.Quantidade, [Validators.required, Validators.min(1)]],
            dataEntrada: [movimen.Data_Entrada, [Validators.required, this.naoPermitirDataFutura]],
            categoria: [movimen.Categoria, Validators.required],
            avisarEstoqueMax: [movimen.AvisarEstoqueMax],
            avisarEstoqueMin: [movimen.AvisarEstoqueMin],
          });
        },
        error: (err) => {
          console.error('Erro ao carregar movimentação:', err);
          this.snackbar.open('Erro ao carregar movimentação', 'Fechar');
        }
      });

      this.service.getColetas().subscribe({
        next: (coletas) => this.chavesColeta = coletas,
        error: (err) => console.error('Erro ao carregar coletas:', err)
      });
    });
  }

  naoPermitirDataFutura(control: AbstractControl): ValidationErrors | null {
    const hoje = new Date();
    const valor = new Date(control.value);
    return valor > hoje ? { dataFutura: true } : null;
  }

  private formatarDataEntrada(data: any): string {
    if (!data) return '';

    if (typeof data === 'string') {
      return data.split('T')[0];
    }

    if (data instanceof Date) {
      return data.toISOString().split('T')[0];
    }

    return new Date(data).toISOString().split('T')[0];
  }


  salvarEdicao() {
    if (this.formEdicao.invalid) {
      this.snackbar.open('Por favor, corrija os erros no formulário.', 'Fechar', { duration: 3000 });
      return;
    }

    const form = this.formEdicao.value;

    const dadosAtualizados: EditarMovimenModel = {
      ID_Movimen: this.idSelecionado,
      ID_Coleta: Number(form.ID_Coleta),
      Quantidade: Number(form.quantidade),
      Data_Entrada: this.formatarDataEntrada(form.dataEntrada),
      Categoria: form.categoria,
      AvisarEstoqueMax: form.avisarEstoqueMax,
      AvisarEstoqueMin: form.avisarEstoqueMin,
};


    this.service.editarMovimen(String(this.idSelecionado), dadosAtualizados).subscribe({
      next: () => {
        this.snackbar.open('Movimentação atualizada com sucesso', 'Fechar', { duration: 3000 });
        this.movimenSelecionado = { ...this.movimenSelecionado, ...this.formEdicao.value };
        this.modoEdicao = false;
      },
      error: (err) => {
        console.error('Erro ao editar movimentação:', err);
        this.snackbar.open('Erro ao editar movimentação', 'Fechar', { duration: 4000 });
      }
    });
  }

  inativarMovimentacao() {
    if (confirm('Tem certeza que deseja inativar esta movimentação?')) {
      this.service.inativarMovimen(String(this.idSelecionado)).subscribe({
        next: () => {
          this.snackbar.open('Movimentação inativada com sucesso', 'Fechar', { duration: 3000 });
          this.router.navigate(['/movimentos']);
        },
        error: (err) => {
          console.error('Erro ao inativar movimentação:', err);
          this.snackbar.open('Erro ao inativar movimentação', 'Fechar', { duration: 4000 });
        }
      });
    }
  }
}
