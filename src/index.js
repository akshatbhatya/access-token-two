import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import app from './app.js';
import connectDb from './db/index.js';
const portNumber=process.env.PORT ||8080;
connectDb()
  .then(() => {
    app.listen(portNumber, () => {
      console.log(`http://localhost:${portNumber}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
