import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToggleMenuService } from '../lib-services/services/toggle-menu/toggle-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent implements OnInit, OnDestroy {

  fullMenuView = true;
  subscription: Subscription;

  constructor(private toggleViewService: ToggleMenuService) { }

  ngOnInit() {
    this.subscription = this.toggleViewService.getMenuViewType$.subscribe(menu => {
      this.fullMenuView = menu;
      console.log('aside  ', this.fullMenuView);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
