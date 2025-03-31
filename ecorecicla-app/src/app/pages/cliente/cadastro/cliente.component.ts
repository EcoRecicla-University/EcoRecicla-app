import { Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatRadioModule} from '@angular/material/radio';

@Component ({
    selector: 'app-pages-cliente',
    templateUrl: './cliente.component.html',
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatRadioModule]
})
export class PagesClienteComponent {
    
}