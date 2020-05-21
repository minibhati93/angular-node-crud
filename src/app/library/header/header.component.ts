import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  isUserLoggedIn = false;
  currentUser: string;
  @Input() loginPage: boolean;

  constructor(private toggleViewService: ToggleMenuService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.toggleViewService.getMenuViewType$.subscribe(menu => {
      this.fullMenu = menu;
    });
    if (this.authService.isAuthenticated()) {
      this.isUserLoggedIn = true;
      this.authService.currentUser.subscribe(data => this.currentUser = data);
    }
  }

  toggleFullMenu() {
    this.fullMenu = !this.fullMenu;
    this.toggleViewService.menuTypeSubject$.next(this.fullMenu);
  }

  logout() {
    this.authService.removeToken();
    this.authService.updateUserValue(null);
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
