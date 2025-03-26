import { Component } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component ({
    selector: 'app-pages-estoque',
    templateUrl: './estoque.component.html',
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatCheckboxModule],
})
export class PagesEstoqueComponent {

}