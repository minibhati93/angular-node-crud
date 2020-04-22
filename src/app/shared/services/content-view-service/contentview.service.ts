import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentviewService {

  public viewTypeSubject$: BehaviorSubject<string>;
  public viewType = 'thumbnail';

  constructor() {
    this.viewTypeSubject$ = new BehaviorSubject<string>(this.viewType);
  }

  get contentViewType$() {
    return this.viewTypeSubject$.asObservable();
  }

  updateContentView(view) {
    this.viewType = view;
    this.viewTypeSubject$.next(view);
  }

}
