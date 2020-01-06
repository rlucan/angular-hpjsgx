import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

export interface CalcInput {
  sign?: '+' | '-';
  inputNumber?: string;
  valid: boolean;
}

export type CalcButton = 'AC' | '<' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '+' | '-' | '*' | '/' | '.' | '+/-' | '=';

export interface CalcHistory {
  session: (CalcButton|number)[];
  result: number;
}

@Injectable()
export class CalcState {

  public session$: BehaviorSubject<CalcHistory> = new BehaviorSubject({ session: [], result: null});

  public history$: BehaviorSubject<CalcHistory[]> = new BehaviorSubject([]);

  private sessionTotal = 0;

  public currentInput$: BehaviorSubject<CalcInput> = new BehaviorSubject({
    sign: '+',
    inputNumber: '0',
    valid: true
  });

  private previousButtonKind: 'input' | 'operator' | 'equals' = 'input';

  public input(button: CalcButton) {

    if (this.previousButtonKind === 'equals' || !this.currentInput$.getValue().valid) {
      this.clear();
    }

    const n: CalcInput = this.previousButtonKind === 'operator' ? { sign: '+', inputNumber: '0', valid: true} : this.currentInput$.getValue();

    this.previousButtonKind = 'input';

    switch (button) {
      case '<':
        if (this.previousButtonKind === 'input') {
          if (n.inputNumber.length > 1) {
            n.inputNumber = n.inputNumber.substr(0, n.inputNumber.length - 1);
          } else {
            n.inputNumber = '0';
          }
        }
        break;

      case '.':
        if (n.inputNumber.indexOf('.') > -1) {
          return;
        } else {
          n.inputNumber += '.';
        }
        break;

      case '+/-':
        n.sign = n.sign === '+' ? '-' : '+';
        break;

      default:
        if (n.inputNumber.length > 15) {
          return;
        }
        if (n.inputNumber === '0') {
          n.inputNumber = button;
        } else {
          n.inputNumber += button;
        }
    }

    this.currentInput$.next(n);
  }

  public operation(button: CalcButton) {

    if (!this.currentInput$.getValue().valid) {
      this.clear();
    }

    let session = this.session$.getValue().session;
    const currentInput = this.currentInput$.getValue();
    let currentNumber = (currentInput.sign === '-' ? -1 : 1) * +currentInput.inputNumber;

    if (this.previousButtonKind === 'equals' && button !== '=') {
      session = [ this.sessionTotal, button ];
      this.previousButtonKind = 'operator';
    }

    if (button === '=') {
      switch (this.previousButtonKind) {

        case 'equals':
          if (session[session.length - 1] === '=' && session.length === 2) {
            return;
          }
          currentNumber = +session[session.length - 2];
          session = [this.sessionTotal, session[session.length - 3]];
          this.previousButtonKind = 'input';
          break;

        case 'input':
          this.clear();
          break;

        case 'operator':
          this.previousButtonKind = 'input';
          break;
      }
    }

    if (this.previousButtonKind === 'input') {

      if (session.length > 1) {
        switch (session[session.length - 1]) {
          case '+':
            this.sessionTotal = this.sessionTotal + currentNumber; break;
          case '-':
            this.sessionTotal = this.sessionTotal - currentNumber; break;
          case '*':
            this.sessionTotal = this.sessionTotal * currentNumber; break;
          case '/':
            this.sessionTotal = this.sessionTotal / currentNumber; break;
        }
        if (!isFinite(this.sessionTotal) || isNaN(this.sessionTotal)) {
          this.currentInput$.next({
            valid: false
          });
          return;
        }
        this.currentInput$.next({
          sign: this.sessionTotal < 0 ? '-' : '+',
          inputNumber: Math.abs(this.sessionTotal).toString(),
          valid: true
        });
      } else {
        this.sessionTotal = currentNumber;
      }
      session.push(currentNumber);
      session.push(button);
    } else {
      session[session.length - 1] = button;
    }
    this.session$.next({session, result: null});

    if (button === '=') {
      this.previousButtonKind = 'equals';
      const h = this.history$.getValue();
      h.splice(0, 0, { session, result: this.sessionTotal});
      this.history$.next(h);
    } else {
      this.previousButtonKind = 'operator';
    }
  }

  clear() {
    this.currentInput$.next({sign: '+', inputNumber: '0', valid: true});
    this.session$.next({ session: [], result: null});
    this.previousButtonKind = 'input';
  }
}

