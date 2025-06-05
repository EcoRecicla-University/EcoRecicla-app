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

@Component({
  selector: 'app-pages-veiculos',
  templateUrl: './cadastro.component.html',
  standalone: true,
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
  public idSelecionado = null;

  public form = new FormGroup({
    placa: new FormControl('', Validators.required),
    modeloVeiculo: new FormControl('', Validators.required),
    quilometragem: new FormControl('', Validators.required),
    renavam: new FormControl('', Validators.required),
    capacidade: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private service: VeiculosService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
  }

  salvar() {
    if (this.form.invalid) {
      this.snackbar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }

    const dadosDoFormulario: CadastroVeiculosModel = {
      Placa: this.form.value.placa ?? '',
      Modelo: this.form.value.modeloVeiculo || undefined,
      Quilometragem: this.form.value.quilometragem || undefined,
      Renavam: this.form.value.renavam ?? '',
      Capacidade_em_Kg: this.form.value.capacidade ?? ''
    };

    this.service.criarNovoVeiculo(dadosDoFormulario).subscribe({
      next: () => {
        this.snackbar.open('Veículo criado com sucesso', 'Fechar', { duration: 3000 });
        this.router.navigate(['..'], {
          relativeTo: this._activatedRoute
        });
      },
      error: (err) => {
        const msg = err?.error?.error || 'Erro ao criar veículo. Verifique os dados e tente novamente.';
        this.snackbar.open(msg, 'Fechar', { duration: 5000 });
      }
    });
  }
}