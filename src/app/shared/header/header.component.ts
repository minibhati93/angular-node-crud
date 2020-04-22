import { Component, OnInit } from '@angular/core';
import { ContentviewService } from '../services/content-view-service/contentview.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  viewType = 'thumbnail';

  constructor(private contentView: ContentviewService) { }

  ngOnInit() {
    this.contentView.viewType = this.viewType;
  }

  toggleViewType(view) {
    this.contentView.updateContentView(view);
  }



}
