import { User } from '../../models/user';
import { BookMetrics } from '../../models/metrics';
import { resolve } from 'dns';

export class LibraryController {
  public authenticate = ( username: string, password: string ) => {
   return User.findOne({username}).exec().then($u =>  {
     if($u != null){
      if($u.username === username && $u.password === password){
        return true;
      }
      return false;
     }
   });
  }

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
                addedDate: new Date(_unreadBook.addedDate),
                modifiedDate: new Date(_unreadBook.modifiedDate),
                completionDate: ''
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
}

export const libController = new LibraryController();
