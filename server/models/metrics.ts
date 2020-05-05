import  mongoose, { Schema, Document, model, Model } from 'mongoose';

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
  user : { type: String, ref: 'users', required: true },
  bookId : { type: Schema.Types.ObjectId, ref: 'books', required: true },
  status: { type: String, required: true },
  progress: { type: Number, default: 0 },
  addedDate: { type: Date, required: true },
  modifiedDate: { type: Date, required: true },
  completedDate: { type: Date }
},
{ collection: 'metrics'}
);

export const BookMetrics: Model<IMetrics>  = model<IMetrics>('Metics', MetricsScheme);
