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
      console.log(_unreadBook.bookId);
      BookMetrics.findOne({ user: userId, bookId: _unreadBook.bookId }).exec().then(
        $dataModel => {
          if($dataModel){
            actions.push(Promise.resolve($dataModel));
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
            actions.push(Promise.resolve('success'));
          }
        }
      );
    });
    return Promise.all(actions);
  }

  public addNewUserToUnread = async (_books: any, userId: string) => {
    return new Promise((resolve, reject) => {
      const doc = new BookMetrics({ user: userId, inprogress: _books });
      doc.save().then(_data => {
        console.log(' inserted ', _data);
        resolve(_data);
      }).catch(err => {
        reject( 'insert error in insertion');
      });
    })
  }
}


export const libController = new LibraryController();
