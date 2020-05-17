import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToggleMenuService } from '../lib-services/services/toggle-menu/toggle-menu.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../lib-services/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public fullMenu: boolean;
  subscription: Subscription;
  currentUser: User;

  constructor(private toggleViewService: ToggleMenuService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.toggleViewService.getMenuViewType$.subscribe(menu => {
      this.fullMenu = menu;
    });
    this.authService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  toggleFullMenu() {
    this.fullMenu = !this.fullMenu;
    this.toggleViewService.menuTypeSubject$.next(this.fullMenu);
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log('destroying header');
      this.subscription.unsubscribe();
    }
  }

}
