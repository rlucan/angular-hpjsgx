import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CalcService} from '../../services/calc.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent {

  formattedNumber$ = new Observable<string>((ob) => {
    this.calc.currentInput$.subscribe(r => {
      ob.next('*' + (r.sign === '-' ? '-' : '') + r.number);
    });
  });

  constructor(private calc: CalcService) {
  }
}
