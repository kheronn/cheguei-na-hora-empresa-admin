import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/components/button/button';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import {EditorModule} from 'primeng/editor';

import { MessagesModule } from 'primeng/components/messages/messages';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { TabViewModule } from 'primeng/components/tabview/tabview';


@NgModule({
  imports: [
    CommonModule, ButtonModule, FieldsetModule, InputMaskModule, MessagesModule, CheckboxModule, EditorModule,
    DialogModule, InputTextModule, InputTextareaModule, DropdownModule, KeyFilterModule, BlockUIModule,
    ConfirmDialogModule, CalendarModule, TabViewModule, ToggleButtonModule
  ],
  exports: [
    ButtonModule, FieldsetModule, InputMaskModule, MessagesModule, CheckboxModule, BlockUIModule, EditorModule,
    DialogModule, InputTextModule, InputTextareaModule, DropdownModule, KeyFilterModule,
    ConfirmDialogModule, CalendarModule, TabViewModule, ToggleButtonModule

  ],
  declarations: []
})
export class PrimeNGModule { }
