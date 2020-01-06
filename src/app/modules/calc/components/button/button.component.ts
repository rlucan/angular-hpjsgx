import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CalcButton, CalcState} from '../../calc.state';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() role: CalcButton;

  constructor(private calcState: CalcState) { }

  ngOnInit() {
  }

  @HostListener('click')
  click() {
    switch (this.role) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '.':
      case '+/-':
      case '<':
        this.calcState.input(this.role);
        break;

      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        this.calcState.operation(this.role);
        break;

      case 'AC':
        this.calcState.clear();
    }
  }
}
