const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const userModel = require("./models/userModel");
const excelToJson = require("convert-excel-to-json");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const dotenv = require("dotenv").config();

// Multer Storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

//connect to db
mongoose
  .connect(
    process.env.MONGODB_URL,

    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("DB Disconnect" + err));

// template engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
//static folder
app.use(express.static(path.resolve(__dirname, "public")));

// Routes
// app.get("/", (req, res) => {
//   // res.sendFile(__dirname + "/index.html");
  
//   res.status(200).json("Api Working 🚀")
// });

app.get("/",(req,res) => {
  res.send("Netflix Server Working")
})

// get all Data
app.get("/data", async (req, res) => {
  try {
    const result = await userModel.find().sort({ _id: 1 }).limit(30);
    // console.log("DB DATA :"+result);
    res.status(200).json(result);
  } catch (err) {
    res.json(err);
  }
});

// get all Data
app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const result = await userModel.findById(`${id}`);
    // console.log("DB DATA :"+result);
    res.status(200).json(result);
  } catch (err) {
    res.json(err);
  }
});

// Upload excel file and import to mongodb
app.post("/uploadfile", uploads.single("file"), (req, res) => {
  const result = excelToJson({
    sourceFile: "./public/uploads/" + req.file.originalname,

    // name: "CPAT",
    header: {
      rows: 1,
    },

    // 34
    columnToKey: {
      A: "productCode",
      B: "PartClassification",
      C: "Relationship",
      D: "Parent",
      E: "Type",
      F: "Name",
      G: "Revision",
      H: "DisplayName",
      I: "DESCRIPTION",
      J: "VCDesignStandard",
      K: "SupplyResponsibility",
      L: "EngineeringDeliveryType",
      M: "TobeShipped",
      N: "tc_tree_name",
      O: "tc_parent_tree_name",
      P: "tc_tree_name",
      Q: "Usage",
      R: "FindNumber",
      S: "Quantity",
      T: "UnitofMeasure",
      U: "State",
      V: "Weight",
      W: "POTaxCode",
      X: "POTaxDesc",
      Y: "ItemPricingIdentifier",
      Z: "ManufacturerName",
      AA: "ManufacturerModelNumber",
      AB: "ClassificationPath",
      AC: "PreAssembledAtShop",
      AD: "CollaborativeSpace",
      AE: "Originated",
      AF: "Modified",
      AG: "Originator",
      AH: "ChangeActions",
      AI: "Specification",
      AJ: "Path",
    },
  });

  const values = Object.values(result);
  // -> Log Excel Data to Console
  //   console.log(values);

  values.map(async (data) => {
    // Insert Json-Object to MongoDB

    // console.log(data);

    try {
      await userModel.insertMany(data, (err, data) => {
        if (data) {
          res.status(201).json(data);
        } else {
          res.json(err);
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  fs.unlinkSync("./public/uploads/" + req.file.originalname);

  // -> Read Excel File to Json Data
  //   const excelData = excelToJson({
  //     sourceFile: "./public/uploads/" + req.file.originalname,
  //     sheets: [
  //       {
  //         // Excel Sheet Name
  //         name: "Tafe",
  //         // Header Row -> be skipped and will not be present at our result object.
  //         // header: {
  //         //   rows: 1,
  //         // },
  //         // Mapping columns to keys
  //         columnToKey: {
  //           "*": "{{columnHeader}}",
  //         },
  //       },
  //     ],
  //   });
});

//assign port
var port = process.env.PORT || 3000;
app.listen(port, () => console.log("server run at port " + port));
