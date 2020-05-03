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

  public addBooksToUnreadStack = (_books: any, userId: string) => {
    return new Promise( (resolve, reject) => {
      BookMetrics.findOne({ user: userId }).exec().then(
        $dataModel => {
          if($dataModel) {
            // Update the Inprogress data for existing user
            const inprogress = $dataModel.toObject().inprogress;
            const ifBookExists = inprogress.
                some((item: { bookId: string; }) =>
                _books.some((modelItem: { bookId: string; }) => modelItem.bookId === item.bookId.toString()));
            if(!ifBookExists){
              inprogress.push(_books);
              console.log(inprogress);
              $dataModel.save().then(() => console.log('saved')).catch(err => console.log('err in updated'));
            }
            resolve($dataModel);
          } else {
            // Inserting a new User with Inprogress data
            const doc = new BookMetrics({ user: userId, inprogress: _books });
            doc.save().then(_data => {
              console.log(' inserted ', _data);
              resolve(_data);
            }).catch(err => {
              reject( 'insert error in insertion');
            });
          }
        }
      ).catch(err =>{
        reject( 'insert error in insertion');
      });
    });
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
