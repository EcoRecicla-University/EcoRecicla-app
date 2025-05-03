import { Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from "@angular/material/core";

@Component ({
    selector: 'app-pages-cadastro',
    templateUrl: './cadastro.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule]
})
export class PagesFuncionariosFuncionariosCadastroComponent {
    readonly startDate = new Date(1990, 0, 1);
}