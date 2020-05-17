import { Request, Response } from 'express';
import { User } from '../../models/user';
import { BookMetrics } from '../../models/metrics';

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

  public createUser = (username: string,email: string, password: string, role: string,
                       firstName: string, lastName: string) => {
    const user = new User({ username, email, password, role, firstName, lastName });
    return User.findOne({email}).exec().then(async $model => {
      if(!$model) {
        return await user.save().then(data => data).catch(err => false);
      }
    });
  }

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
