const express = require('express');
const app = express();
const cors = require('cors');
const uploadRouter = require('./upload');
const MediaStreamingRouter = require('./media-streaming');

app.use(cors());
app.use(express.json());

const port = 5000;

app.use('/upload', uploadRouter);
app.use('/media-streaming', MediaStreamingRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
