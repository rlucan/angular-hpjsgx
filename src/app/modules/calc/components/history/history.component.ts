import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CalcState} from '../../calc.state';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {

  get history$() {
    return this.calcState.history$;
  }

  constructor(private calcState: CalcState) { }

  ngOnInit() {
  }

  clearHistory() {
    this.history$.next([]);
  }
}
