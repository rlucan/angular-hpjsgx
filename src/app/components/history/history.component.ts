import { Component, OnInit } from '@angular/core';
import {CalcService} from '../../services/calc.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private calc: CalcService) { }

  ngOnInit() {
  }

}
