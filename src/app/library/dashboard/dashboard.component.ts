import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageBooksService } from '../lib-services/services/manage-books/manage-books.service';
import { AuthService } from '../lib-services/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  userName: string;
  inProgressCount: number;
  completedCount = 0;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private manageBooksService: ManageBooksService) { }

  ngOnInit() {
    if (!this.userName) {
      this.userName = localStorage.getItem('currentUser');
    }
    this.getBooksCount('inprogress', this.manageBooksService.inprogressCountSubject$);
  }

  getBooksCount(status: string, behaviourSubject) {
    const userId = this.authService.currentUserValue;
    this.manageBooksService.booksReadCount(userId.username, status).subscribe(
        (data: number) =>   {
          behaviourSubject.next(data);
          this.inProgressCount = this.manageBooksService.getInProgressReadCount$;
    });
  }

}
