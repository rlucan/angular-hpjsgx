import { Component, OnInit } from '@angular/core';
import {CalcState} from '../../calc.state';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-calculator-dialog',
  templateUrl: './calculator-dialog.component.html',
  styleUrls: ['./calculator-dialog.component.scss'],
  providers: [ CalcState ]
})
export class CalculatorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CalculatorDialogComponent>,
              private calcState: CalcState) { }

  ngOnInit() {
  }

  close() {
    const v = this.calcState.currentInput$.getValue();
    this.dialogRef.close((v.sign === '+' ? 1 : -1) * +v.inputNumber);
  }
}
