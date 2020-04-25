export interface BookInterface {
  _id: string;
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
