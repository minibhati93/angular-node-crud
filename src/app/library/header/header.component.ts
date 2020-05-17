import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToggleMenuService } from '../lib-services/services/toggle-menu/toggle-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public fullMenu: boolean;
  subscription: Subscription;

  constructor(private toggleViewService: ToggleMenuService) { }

  ngOnInit() {
    this.subscription = this.toggleViewService.getMenuViewType$.subscribe(menu => {
      this.fullMenu = menu;
      console.log('header ', this.fullMenu);
    });
  }

  toggleFullMenu() {
    this.fullMenu = !this.fullMenu;
    this.toggleViewService.menuTypeSubject$.next(this.fullMenu);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
