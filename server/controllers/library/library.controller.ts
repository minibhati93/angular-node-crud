import { BookMetrics } from '../../models/metrics';

export class LibraryController {
  /***
   * Add books to inprogress status
   */

  public addBooksToUnreadStack = (_books: any, userId: string) => {
    const actions: any[] = [];
    _books.forEach((_unreadBook: any) => {
      const promise = new Promise((_resolve, reject) => {
        BookMetrics.findOne({ user: userId, bookId: _unreadBook.bookId }).exec().then(
          $dataModel => {
            if($dataModel){
              console.log($dataModel);
            }
            else {
              const bookData = new BookMetrics({
                user: userId,
                bookId: _unreadBook.bookId,
                status: 'inprogress',
                progress: _unreadBook.progress,
                addedDate: _unreadBook.addedDate,
                modifiedDate: _unreadBook.modifiedDate
              });
              bookData.save();
              _resolve({bookId: _unreadBook.bookId, status: 'success'});
            }
          }
        );
      });
      actions.push(promise);
    });
    return Promise.all(actions);
  }

  /***
   * Returns the count of unread books
   */
  public getBooksCountByStatus = async (userId: string, status: string) => {
    return await BookMetrics.find({user: userId, status }, 'bookId' ).lean();
  }

  public getBooksByStatus = async (username: string, status: string ) => {
    return await BookMetrics.find({user: username, status}).populate('bookId').exec();
  }
}


export const libController = new LibraryController();
