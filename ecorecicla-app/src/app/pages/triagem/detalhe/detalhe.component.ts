import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TriagemService } from '../../../core/services/triagem.service';
import { CadastroTriagemModel } from '../../../core/models/private/triagem/cadastroTriagem.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-triagem-detalhe',
  standalone: true,
  templateUrl: './detalhe.component.html',
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
})
export class PagesTriagemDetalheComponent implements OnInit {

  idCentro: number;
  dados: CadastroTriagemModel;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private service: TriagemService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.idCentro = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getCentroTriagemById(this.idCentro).subscribe({
      next: (dados) => {
        this.dados = dados;
        this.carregando = false;
      },
      error: () => {
        this.snackbar.open('Erro ao carregar detalhes do centro', 'Fechar', { duration: 3000 });
        this.router.navigate(['/triagem']);
      }
    });
  }

  inativar(): void {
    if (confirm('Tem certeza que deseja inativar este centro de triagem?')) {
      this.service.inativarCentroTriagem(this.idCentro).subscribe({
        next: () => this.router.navigate(['/triagem']),
        error: () => alert('Erro ao inativar o centro.')
      });
    }
  }
}
