const express = require('express');
const app = express();
const cors = require('cors');
const uploadRouter = require('./upload');

app.use(cors());
app.use(express.json());

const port = 5000;

app.use('/upload', uploadRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
