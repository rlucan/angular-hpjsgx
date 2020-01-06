import { Component } from '@angular/core';
import {CalcService} from './modules/calc/services/calc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ CalcService ]
})
export class AppComponent {

  public input = '';

  constructor(private calc: CalcService) {
  }

  openCalc() {
    this.calc.open().afterClosed().subscribe(r => {
      if (r) {
        this.input = r;
      }
    });
  }
}
