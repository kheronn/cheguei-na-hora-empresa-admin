import { NgModule } from '@angular/core';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [FuncionarioComponent],
  providers:[DatePipe],
  imports: [
    ComumModule,
    NgxSpinnerModule,
    NgSelectModule,

    FuncionarioRoutingModule
  ]

})
export class FuncionarioModule { }
