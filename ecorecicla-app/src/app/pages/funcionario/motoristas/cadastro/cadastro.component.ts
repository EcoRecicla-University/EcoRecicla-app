import { Component } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component ({
    selector: 'app-pages-funcionario-motorista-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule]
})
export class PagesFuncionariosMotoristasCadastroComponent {
    readonly startDate = new Date(1990, 0, 1);
}