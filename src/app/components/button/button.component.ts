import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {CalcService} from '../../services/calc.service';

export type Button = '1' | '2' | '+' | '-' | '.' | '+/-';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() role: Button;

  constructor(private calc: CalcService) { }

  ngOnInit() {
  }

  @HostListener('click')
  click() {
    this.calc.press(this.role);
  }

}
