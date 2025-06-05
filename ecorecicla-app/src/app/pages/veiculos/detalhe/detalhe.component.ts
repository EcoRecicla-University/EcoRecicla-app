import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeiculosService } from '../../../core/services/veiculos.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-veiculos-detalhe',
  templateUrl: './detalhe.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class VeiculosDetalheComponent implements OnInit {
  modoEdicao = false;
  formEdicao!: FormGroup;
  idVeiculo!: number;
  dadosDetalhe: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: VeiculosService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.idVeiculo = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarDetalhes();

    this.formEdicao = this.fb.group({
      Placa: ['', [Validators.required, Validators.maxLength(8)]],
      Modelo: ['', [Validators.required, Validators.maxLength(20)]],
      Quilometragem: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      Renavam: ['', [Validators.required, Validators.pattern(/^\d{9,11}$/)]],
      Capacidade_em_Kg: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }

  buscarDetalhes(): void {
    this.service.getVeiculo(this.idVeiculo).subscribe((dados) => {
      this.dadosDetalhe = dados;
      this.formEdicao.patchValue(dados);
    });
  }

  alternarModoEdicao(): void {
    this.modoEdicao = !this.modoEdicao;
  }

  salvarEdicao(): void {
    if (this.formEdicao.invalid) {
      this.snackbar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
        duration: 3000
      });
      return;
    }

    this.service.editarVeiculo(this.idVeiculo, this.formEdicao.value).subscribe({
      next: () => {
        this.snackbar.open('Veículo atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.modoEdicao = false;
        this.buscarDetalhes();
      },
      error: (err) => {
        this.snackbar.open(err.error?.error || 'Erro ao salvar alterações.', 'Fechar');
      }
    });
  }

  inativar(): void {
    this.service.inativarVeiculo(this.idVeiculo).subscribe(() => {
      this.snackbar.open('Veículo inativado com sucesso!', 'Fechar');
      this.router.navigate(['/veiculos']);
    });
  }
}
