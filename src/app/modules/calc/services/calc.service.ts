import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CalculatorDialogComponent} from '../components/calculator-dialog/calculator-dialog.component';

export interface CalcInput {
  sign: '+' | '-';
  number: string;
}

@Injectable()
export class CalcService {

  constructor(private dialog: MatDialog) { }

  public open() {
    return this.dialog.open(CalculatorDialogComponent, {
      // width: '350px'
    });
  }

}

