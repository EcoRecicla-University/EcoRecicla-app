import { Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component ({
    selector: 'app-pages-veiculos',
    templateUrl: './veiculos.component.html',
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatCheckboxModule]
})
export class PagesVeiculosComponent{

}