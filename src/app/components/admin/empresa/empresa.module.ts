import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { ComumModule } from 'src/app/modules/comum.module';


@NgModule({
  declarations: [EmpresaComponent],
  imports: [
    ComumModule,
    NgxSpinnerModule,
    NgSelectModule,
    EmpresaRoutingModule
  ]
})
export class EmpresaModule { }
