import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToggleMenuService } from '../lib-services/services/toggle-menu/toggle-menu.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent implements OnInit, OnDestroy {

  fullMenuView = true;
  subscription: Subscription;
  showDropdown = false;

  constructor(private toggleViewService: ToggleMenuService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.toggleViewService.getMenuViewType$.subscribe(menu => {
      this.fullMenuView = menu;
    });
  }

  navigateTo(url) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
