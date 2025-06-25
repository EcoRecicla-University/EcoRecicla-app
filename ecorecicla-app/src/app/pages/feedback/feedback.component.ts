import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { DATE_CONFIG_PROVIDERS } from '../../core/date-format.config';
import {MatSliderModule} from '@angular/material/slider';


@Component ({
    selector: 'app-pages-coleta-cadastro',
    templateUrl: './feedback.component.html',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSliderModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule
    ],
    providers: [provideNativeDateAdapter(), DatePipe, ...DATE_CONFIG_PROVIDERS],
})

export class PagesFeedbackComponent implements OnInit{

    public form = new FormGroup({
        clienteId: new FormControl('', [Validators.required]),
        dataColeta: new FormControl('', [Validators.required]),
        quantidade: new FormControl('', [Validators.required]),
        notaServico: new FormControl('', [Validators.required]),
        statusColeta: new FormControl('', [Validators.required]),
        comentario: new FormControl('') // Comentário opcional
    });

    constructor(
        
    ) {}

    ngOnInit(): void {
        
    }

    formatLabel(value: number): string {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'estrelas';
        }

        return `${value}`;
    }
}