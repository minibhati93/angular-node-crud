import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  public menuTypeSubject$: BehaviorSubject<boolean>;

  constructor() {
    this.menuTypeSubject$ = new BehaviorSubject<boolean>(true);
  }

  get getMenuViewType$(): Observable<any> {
    return this.menuTypeSubject$.asObservable();
  }

  updateMenuViewType(type: boolean) {
    console.log('setting ', type);
    this.menuTypeSubject$.next(type);
  }
}
