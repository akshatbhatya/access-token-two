import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(
  express.urlencoded({
    limit: '16kb',
  })
);

app.use(
  express.json({
    limit: '16kb',
  })
);

export default app;