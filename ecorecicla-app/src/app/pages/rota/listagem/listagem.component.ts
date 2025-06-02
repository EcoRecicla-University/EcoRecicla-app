import { Component } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";

@Component ({
    selector: 'app-pages-rota-listagem',
    templateUrl: './listagem.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        RouterLink,
        MatIcon
    ]
})
export class PagesRotaListagemComponent {

}