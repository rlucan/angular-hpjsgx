import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CalcState} from '../../calc.state';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
