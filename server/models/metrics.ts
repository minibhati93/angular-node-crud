import  mongoose, { Schema, Document, model, Model } from 'mongoose';

interface Inprogress extends Document {
  bookId: number,
  addedOn: Date,
  modifiedOn: Date,
  completionStatus: number
}

interface IMetrics extends Document {
  user: string;
  read: {
    bookId: number,
    completedOn: Date
  };
  inprogress: [Inprogress]
}

const MetricsScheme = new Schema({
  user : { type: String, ref: 'users', required: true },
  read  : [{
    bookId:  { type: Number, ref: 'books', required: true },
    completedOn: { type: Date, required: true }
  }],
  inprogress : [{
    bookId:  { type: Schema.Types.ObjectId, ref: 'books', required: true },
    addedOn: { type: Date, required: true },
    modifiedOn: { type: Date, required: true },
    completionStatus: { type: Number, required: true , default: 0},
    _id : { id:false }
  }],
},
{ collection: 'metrics'}
);

export const BookMetrics: Model<IMetrics>  = model<IMetrics>('Metics', MetricsScheme);
