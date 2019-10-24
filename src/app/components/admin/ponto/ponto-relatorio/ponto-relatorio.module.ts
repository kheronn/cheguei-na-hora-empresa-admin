import { NgModule } from '@angular/core';

import { PontoRelatorioRoutingModule } from './ponto-relatorio-routing.module';
import { PontoRelatorioComponent } from './ponto-relatorio.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [PontoRelatorioComponent],
  imports: [
    ComumModule,
    NgxSpinnerModule,
    NgSelectModule,
    PontoRelatorioRoutingModule
  ]
})
export class PontoRelatorioModule { }
