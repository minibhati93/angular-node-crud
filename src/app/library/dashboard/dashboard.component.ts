import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  userName: string;
  chartData: Array<any>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.userName) {
      this.userName = localStorage.getItem('currentUser');
      console.log('can dashboard 2', this.userName);
    }
    this.generateData();
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }

}
