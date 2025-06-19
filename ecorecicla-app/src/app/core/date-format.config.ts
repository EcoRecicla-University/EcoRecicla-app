import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

import { MatDateFormats } from '@angular/material/core';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

// Exporta os providers padronizados
export const DATE_CONFIG_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
];