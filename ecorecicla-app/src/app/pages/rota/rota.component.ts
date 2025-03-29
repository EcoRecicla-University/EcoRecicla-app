import { Component } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component ({
    selector: 'app--pages-rota',
    templateUrl: './rota.component.html',
    providers: [provideNativeDateAdapter()],
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule]
})
export class RotaComponent{

}