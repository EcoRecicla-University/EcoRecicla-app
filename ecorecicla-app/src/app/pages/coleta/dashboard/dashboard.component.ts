import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ColetaService } from "../../../core/services/coleta.service";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component ({
    selector: 'app-pages-coleta-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatIconModule,
        NgxChartsModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [provideNativeDateAdapter(), DatePipe],
})
export class PagesColetaDashboardComponent implements OnInit {

    name = 'Angular';
    width: number = 700;
    height: number = 300;
    fitContainer: boolean = false;

    view: any[] = [600, 400];
    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Cliente';
    showYAxisLabel = true;
    yAxisLabel = 'Quantidade';
    timeline = true;
    doughnut = true;
    colorScheme = {
        domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
    };
    //pie
    showLabels = true;
    // data goes here
    public single = [];

    public form = new FormGroup({
        dataInicio: new FormControl(),
        dataFim: new FormControl()
    });

    constructor(
        private _coletaService: ColetaService
    ) {
        const inicio = new Date();
        inicio.setDate(inicio.getDate() - 45);
        const fim = new Date();

        this.form.patchValue({
            dataInicio: inicio,
            dataFim: fim,
        });
    }

    ngOnInit(): void {
        const inicio = this.form.get('dataInicio').value;
        const fim = this.form.get('dataFim').value;

        this._atualizarGrafico(inicio, fim);
    }

    filtrar(): void {
        const inicio = this.form.get('dataInicio').value;
        const fim = this.form.get('dataFim').value;

        this._atualizarGrafico(inicio, fim);
    }

    private _atualizarGrafico(inicio: Date, fim: Date): void {
        this._coletaService.getDashboardColetas(inicio, fim)
            .subscribe((dadosDashboard) => {
                this.single = dadosDashboard
                    .map(d => ({
                        name: d.Nome_Cliente,
                        value: +d.Quantidade
                    }));
            });
    }
}