import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {HistoryComponent} from './components/history/history.component';
import {DisplayComponent} from './components/display/display.component';
import {ButtonComponent} from './components/button/button.component';
import { SessionComponent } from './components/session/session.component';
import { CalculatorDialogComponent } from './components/calculator-dialog/calculator-dialog.component';



@NgModule({
  declarations: [CalculatorComponent, HistoryComponent, DisplayComponent, ButtonComponent, SessionComponent, CalculatorDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  entryComponents: [
    CalculatorDialogComponent
  ]
})
export class CalcModule { }
