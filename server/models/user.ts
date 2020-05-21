import  mongoose, { Schema, Document, model, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  state: string;
}

const UserSchema = new Schema({
  username : { type: String, required: true },
  email  : { type: String, required: true },
  password  : { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), required: true },
  state: { type: String, required: true, default: 'active' }
},
{ collection: 'users'}
);

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function(next) {
  const user = this as IUser;
  if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        console.log('Error hashing password for user', user.username);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

export const User: Model<IUser>  = model<IUser>('User', UserSchema);
