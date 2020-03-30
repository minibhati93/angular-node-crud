import mongoose from 'mongoose';
const db = 'mongodb://localhost:27017/';

export const connect = () => {
  mongoose
    .connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
    .then( () => {
      return console.log(`Successfully connected to ${db}`);
    })
    .catch( error => {
      console.error('Error connecting to database: ', error);
      return process.exit(1);
    });

  mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected`);
  });
};
