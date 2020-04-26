import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  userName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.userName) {
      this.userName = localStorage.getItem('currentUser');
      console.log('can dashboard 2', this.userName);
    }
  }

}
