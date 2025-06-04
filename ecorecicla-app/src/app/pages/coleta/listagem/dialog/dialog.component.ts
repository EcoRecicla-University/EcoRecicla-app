import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ColetaService } from "../../../../core/services/coleta.service";
import { FormsModule } from "@angular/forms";

@Component ({
    selector: 'pages-coleta-listagem-dialog',
    templateUrl: './dialog.component.html',
    imports: [
        MatDialogModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule,
        FormsModule
    ],
    providers: [provideNativeDateAdapter(), DatePipe],
})

export class DialogListaColetaComponent {

    readonly startDate = new Date(1990, 0, 1);

    dataInicio!: Date;
    dataFim!: Date;

    constructor(
        private service: ColetaService
    ) {}

    baixarRelatorioPorData(){
        if (!this.dataInicio || !this.dataFim) {
            return alert('Selecione as duas datas!');
        }

        const dataInicioString = new Date(this.dataInicio).toISOString().slice(0, 19).replace('T', ' ');
        const dataFimString = new Date(this.dataFim).toISOString().slice(0, 19).replace('T', ' ');


        this.service.gerarRelatorioColetas(dataInicioString, dataFimString)
        .subscribe((blob: Blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            const inicio = this.dataInicio;
            const fim = this.dataFim;
            link.download = `relatorio_coletas_${this.formatarData(inicio)}_a_${this.formatarData(fim)}.xlsx`;
            link.click();
        }, error => {
            alert('Erro ao gerar relatório');
            console.error(error);
        });

    }

    formatarData(data: Date): string {
        const yyyy = data.getFullYear();
        const mm = String(data.getMonth() + 1).padStart(2, '0');
        const dd = String(data.getDate()).padStart(2, '0');

        return `${dd}-${mm}-${yyyy}`;
}
}