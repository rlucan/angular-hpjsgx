import {Injectable} from '@angular/core';
import {Button} from '../components/button/button.component';
import {BehaviorSubject} from 'rxjs';

export interface CalcInput {
  sign: '+' | '-';
  number: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  currentInput$: BehaviorSubject<CalcInput> = new BehaviorSubject({
    sign: '+',
    number: ''
  });

  private lastInputType: 'number' | 'operation' | '' = '';

  // currentNumber = '';

  constructor() { }

  private input(button: Button) {
    const n: CalcInput = this.lastInputType === 'operation' ? { sign: '+', number: ''} : this.currentInput$.getValue();

    this.lastInputType = 'number';

    switch (button) {
      case '.':
        if (n.number.indexOf('.') > -1) {
          return;
        } else {
          n.number += '.';
        }
        break;

      case '+/-':
        n.sign = n.sign === '+' ? '-' : '+';
        break;

      default:
        n.number += button;
    }

    this.currentInput$.next(n);
  }

  private operation(button: Button) {
    this.lastInputType = 'operation';
    console.log(+this.currentInput$.getValue().number);
  }

  public press(button: Button) {
    switch (button) {
      case '1':
      case '2':
      case '.':
      case '+/-':
        this.input(button);
        break;

      case '+':
      case '-':
        this.operation(button);
        break;

    }
  }
}
