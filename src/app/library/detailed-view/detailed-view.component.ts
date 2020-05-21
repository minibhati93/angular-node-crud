import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ManageBooksService } from '../lib-services/services/manage-books/manage-books.service';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.sass']
})
export class DetailedViewComponent implements OnInit, OnChanges {

  constructor(private manageBooksService: ManageBooksService) { }

  @Input() book: any;
  @Input() state: string;
  showInputForProgress = false;
  progressState: number;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.progressState = changes.book.currentValue.progress;
  }

  markAsDone(id) {
    this.manageBooksService.updateBookByStatus(id, 'read').subscribe(
      (data: any) => {
        if (data.response === 'success') {
          console.log('done');
        }
      });
  }

  updateProgress(book: { bookId: { _id: any; }; }) {
    this.manageBooksService.updateInprogressStatus(book.bookId._id, this.progressState).subscribe(
      (data: any) => {
      if (data.response === 'success') {
        this.showInputForProgress = false;
        this.book.progress = this.progressState;
      }
    });
  }

}
