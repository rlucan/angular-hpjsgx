import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CalcState} from '../../calc.state';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent {

  get currentInput$() {
    return this.calcState.currentInput$;
  }

  get session$() {
    return this.calcState.session$;
  }

  constructor(private calcState: CalcState) {
  }
}
