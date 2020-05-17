import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageBooksService } from '../lib-services/services/manage-books/manage-books.service';
import { AuthService } from '../lib-services/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  inProgressCount: number;
  completedCount = 0;
  userId: User;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private manageBooksService: ManageBooksService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.userId = this.authService.currentUserValue;
      this.getBooksCount('inprogress', this.manageBooksService.inprogressCountSubject$);
    }
  }

  getBooksCount(status: string, behaviourSubject) {
    this.manageBooksService.booksReadCount(this.userId.username, status).subscribe(
        (data: number) =>   {
          behaviourSubject.next(data);
          this.inProgressCount = this.manageBooksService.getInProgressReadCount$;
    });
  }

}
