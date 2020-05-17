import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToggleMenuService } from '../lib-services/services/toggle-menu/toggle-menu.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../lib-services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public fullMenu: boolean;
  subscription: Subscription;
  username = 'Mini Bhati';

  constructor(private toggleViewService: ToggleMenuService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.toggleViewService.getMenuViewType$.subscribe(menu => {
      this.fullMenu = menu;
    });
  }

  toggleFullMenu() {
    this.fullMenu = !this.fullMenu;
    this.toggleViewService.menuTypeSubject$.next(this.fullMenu);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log('destroying header');
      this.subscription.unsubscribe();
    }
  }

}
