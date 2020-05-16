import  mongoose, { Schema, Document, model, Model } from 'mongoose';
import { Book } from './book';

interface IMetrics extends Document {
  user : string;
  bookId : Schema.Types.ObjectId;
  status: string;
  progress: number;
  addedDate: Date;
  modifiedDate: Date;
  completedDate: Date;
}

const MetricsScheme = new Schema({
  user : { type: String, required: true },
  bookId : { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, required: true },
  progress: { type: Number, default: 0 },
  addedDate: { type: Date, required: true, default: Date.now() },
  modifiedDate: { type: Date, required: true, default: Date.now() },
  completedDate: { type: Date , default: Date.now() }
},
{ collection: 'metrics'}
);

export const BookMetrics: Model<IMetrics>  = model<IMetrics>('Metics', MetricsScheme);
