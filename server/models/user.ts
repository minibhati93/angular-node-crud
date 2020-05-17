import  mongoose, { Schema, Document, model, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

const UserSchema = new Schema({
  username : { type: String, required: true },
  email  : { type: String, required: true },
  password  : { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true }
},
{ collection: 'users'}
);

export const User: Model<IUser>  = model<IUser>('User', UserSchema);
