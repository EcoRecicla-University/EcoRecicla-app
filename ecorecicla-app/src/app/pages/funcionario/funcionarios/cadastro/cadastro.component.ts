import { Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from "@angular/material/core";
import { FuncionarioService } from "../../../../core/services/funcionarios/funcionario.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component ({
    selector: 'app-pages-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        ReactiveFormsModule,
    ]
})
export class PagesFuncionariosFuncionariosCadastroComponent {

    public form = new FormGroup({
        nome: new FormControl('', Validators.required),
        dataNascimento: new FormControl('', Validators.required),
        telefone: new FormControl('', Validators.required),
        cpf: new FormControl('', Validators.required),
        rg: new FormControl('', Validators.required),
        dataContratacao: new FormControl(null, Validators.required),
        estadoCivil: new FormControl(null, Validators.required)
    })

    readonly startDate = new Date(1990, 0, 1);

    constructor(private _service: FuncionarioService) { }

    salvar(){

    }
}