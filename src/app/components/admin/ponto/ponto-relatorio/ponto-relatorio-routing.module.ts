import { PontoRelatorioComponent } from './ponto-relatorio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: PontoRelatorioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PontoRelatorioRoutingModule { }
