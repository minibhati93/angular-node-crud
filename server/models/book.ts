import  mongoose, { Schema, Document, model, Model } from 'mongoose';

interface IBook extends Document {
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate: Date;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: Array<string>;
  categories: Array<string>;
}

const BookSchema = new Schema({
  title : { type: String, required: true },
  isbn  : { type: String, required: true },
  pageCount: { type: Number, required: true },
  publishedDate: { type: Date, required: true },
  thumbnailUrl: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  status: { type: String, required: true },
  authors: { type: [String] },
  categories: { type: [String] }
},
{ collection: 'books'}
);

export const Book: Model<IBook>  = model<IBook>('Book', BookSchema);
