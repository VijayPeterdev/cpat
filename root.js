const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const tafeModel = require('./Models/tafeModel');

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  var uploads = multer({ storage: storage });
  

// Connect to MongoDB
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a MongoDB schema for the data
// const dataSchema = new mongoose.Schema({
//   column1: String,
//   column2: Number,
//   // Add more columns based on your needs
// });

// Create a MongoDB model for the data
// const Data = mongoose.model('Data', dataSchema);

// Route for uploading the file
app.post('/upload', upload.single('file'), (req, res) => {
  // Read the XLSX file using the xlsx library
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  // Insert the data into MongoDB
  tafeModel.insertMany(data, (error, docs) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(docs);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
