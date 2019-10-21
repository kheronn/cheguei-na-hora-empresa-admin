import { NgModule } from '@angular/core';

import { PontoHojeRoutingModule } from './ponto-hoje-routing.module';
import { PontoHojeComponent } from './ponto-hoje.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [PontoHojeComponent],
  imports: [
    ComumModule,
    NgxSpinnerModule,
    NgSelectModule,
    PontoHojeRoutingModule
  ]
})
export class PontoHojeModule { }
