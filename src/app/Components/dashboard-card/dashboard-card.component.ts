import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  constructor() { }

  @Input()
  cardLabel = '';

  @Input()
  cardCount = 0;

  @Input()
  cardIcon = '';

  @Input()
  cardLink = '';

  @Input()
  iconColor = '';

  ngOnInit(): void {
  }

}
